# 一句話結論

把整頁當「父元件」，先把 **搜尋卡** 和 **結果列表** 兩塊「整段剪下」做成子元件；其餘（空狀態、新規作成 Modal、編集 Modal）第二階段再拆。**子元件只負責畫面與事件、父元件負責資料與狀態。**

---

## 目標

- 從一份大 HTML 模板，演進成「**1 個容器（父元件） + 2 ～ 5 個呈現（子元件）**」的結構。
- **外觀不變、CSS 不動、邏輯不改**；只做區塊抽離與事件接線。
- 先完成最小可用版本（搜尋 + 列表），再逐步抽離其餘三塊。

---

## 專案結構（建議，不需馬上全做）

- 父元件：`features/companies/pages/companies-page.container`
- 子元件（第一階段）：

  - `features/companies/components/company-search-panel`
  - `features/companies/components/company-list`

- 子元件（第二階段）：

  - `features/companies/components/company-empty-state`
  - `features/companies/components/company-create-modal`
  - `features/companies/components/company-edit-modal`

- 共用：既有 `app-loading-spinner`、`app-error-message`、`app-pagination` 保持不變。

> 命名可微調，但「**search-panel**」「**list**」「**empty-state**」「**create-modal**」「**edit-modal**」的角色要清楚。

---

## 角色分工

- **父元件（容器）**：持有並更新狀態（查詢條件、companies、total、pagination、loading、error、是否顯示兩個 modal、目前編輯的 company）。負責打 API、同步 URL、處理子元件事件。
- **子元件（呈現）**：只渲染畫面與發出互動事件；**不打 API、不碰路由、不持久化狀態**。

---

## 抽離邊界（直接對應你現有 HTML 註解）

> 下列「範圍」指的是 **把那一整段 HTML 原封不動地剪下**，貼到新子元件的模板。

1. **搜尋卡 → `company-search-panel`**
   **範圍**：`<!-- Filters Section -->` 內的 `<section class="filters-section neu-card"> ... </section>` 全段。
   **輸入（Inputs）**：`searchTerm`、`selectedType`、`selectedStatus`、`total`、`loading`（顯示計數與禁用按鈕用）。
   **輸出（Outputs）**：

   - `search`（點「検索」或 Enter 提交）
   - `clear`（點「クリア」）
   - `valueChanges`（欄位變動，名稱欄位建議 debounce 後才吐出）
     **備註**：搜尋結果摘要（`search-results-summary` 那段 `@if`）可以保留在此子元件內，由父元件把 `total` 與條件餵進來。

2. **結果列表 → `company-list`**
   **範圍**：`<!-- Companies List -->` 內的 `<section class="companies-grid"> ... </section>` **以及緊接著的** `<app-pagination ...>`。
   **輸入（Inputs）**：`companies`、`currentPage`、`totalPages`、`total`、`limit`。
   **輸出（Outputs）**：

   - `editClick(company)`
   - `deleteClick(company)`
   - `pageChange(page)`
     **備註**：`company-card` 可以暫時不再細拆；若未來需求變複雜再抽子卡片元件。

3. **空狀態 → `company-empty-state`**（第二階段）
   **範圍**：`<!-- Empty State -->` 的 `<div class="empty-state neu-card"> ... </div>`。
   **輸入**：可無。
   **輸出**：`createClick`（點「新規作成」）。

4. **新規作成 Modal → `company-create-modal`**（第二階段）
   **範圍**：`<!-- Create Form Modal -->` 的整段。
   **輸入**：`visible`（或由父決定是否渲染）、必要時傳入預設值。
   **輸出**：`submit(newCompany)`、`cancel`。

5. **編集 Modal → `company-edit-modal`**（第二階段）
   **範圍**：`<!-- Edit Form Modal -->` 的整段。
   **輸入**：`visible`、`company`（要編輯的資料）。
   **輸出**：`submit(updatedCompany)`、`cancel`。

---

## 第一階段：最小可用（只做 2 塊）

> 完成後畫面行為要與現在完全一致。

### 步驟 A：抽出「搜尋卡」

1. 建立 `company-search-panel` 子元件。
2. 把 `<!-- Filters Section -->` 的整段 HTML **剪下**貼進子元件模板。
3. 在父元件模板中，用 `company-search-panel` 取代原本那段區塊。
4. 父元件把 `searchTerm / selectedType / selectedStatus / total / loading` 當作輸入傳給子元件。
5. 子元件把「検索」、「クリア」、「欄位變更」以事件向上拋；父元件接到後，**仍用現有邏輯** 觸發查詢或重置。

**驗收**：

- 點「検索」會更新列表。
- 點「クリア」會清空條件並回到全部。
- 上方計數與條件摘要仍正確顯示。

### 步驟 B：抽出「結果列表」

1. 建立 `company-list` 子元件。
2. 把清單 `<section class="companies-grid"> ... </section>` 與後面的 `<app-pagination ...>` **整段剪下**貼進子元件模板。
3. 父元件模板以 `company-list` 取代原本清單與分頁的區塊。
4. 父元件把 `companies / currentPage / totalPages / total / limit` 傳給子元件；子元件將 `editClick / deleteClick / pageChange` 事件向上拋，父層照舊處理。

**驗收**：

- 清單外觀不變；分頁運作正常。
- 點「編集／削除」仍會呼叫父元件原有邏輯。

> 完成 A + B 後，**80% 結構化已完成**；之後再把空狀態與兩個 Modal 抽出去即可。

---

## 第二階段：抽出剩餘三塊（可分次做）

- **空狀態**：把 `createClick` 泡回父元件，父元件決定開啟「新規作成」Modal。
- **新規作成 / 編集 Modal**：兩個表單各自成元件；所有欄位狀態留在子元件內，提交時以一個物件向上拋給父元件；父元件成功後重整列表或局部更新。

**驗收**：

- 開關 Modal 只由父元件控制（或由父元件決定是否渲染子元件）。
- 表單驗證、提交與取消流程保持與現狀一致。

---

## 不要做的事（Claude 請遵守）

- 不改 CSS class、不動樣式 token（`neu-*` 等維持原樣）。
- 不改既有服務呼叫與路由邏輯。
- 子元件內 **不要引入** API service 或 Router；所有外部互動交給父元件。
- 不更名任何欄位或顯示文案（除非主人指示）。

---

## 完成定義（Definition of Done）

- 畫面與操作流程與現在一致（像素級不必相同，但結構與間距不可跑版）。
- 父元件持有所有狀態；子元件僅透過輸入/輸出互動。
- 刷新頁面時條件、分頁等仍能維持（若既有支援 URL 同步）。
- Loading／Error／Empty 三態切換正常。

---

## 後續可選優化（不影響本次交付）

- 列表再細拆 `company-card`，加上 `trackBy` 與 `OnPush`。
- 搜尋欄位的 `valueChanges` 做 debounce 與 distinct。
- 導入 Facade/Store（若條件、分頁、排序變多）。

---

### 指令摘要（給 Claude CLI 的行動順序）

1. 以目前頁面為父元件，**先抽**：`company-search-panel`（剪 `Filters Section` 整段）。
2. **再抽**：`company-list`（剪清單 + 分頁整段）。
3. 把子元件的輸入/輸出接到父元件原來的屬性與方法；**不改邏輯**。
4. 驗收 A/B；通過後再抽：`company-empty-state`、`company-create-modal`、`company-edit-modal`。
5. 全程保持樣式與文案不變，API 與路由只由父元件負責。
