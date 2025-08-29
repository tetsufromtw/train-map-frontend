# Train Map Frontend

電車路線図フロントエンドアプリケーション

## プロジェクト構成

### 基本アーキテクチャ

このプロジェクトは、FAANG企業のベストプラクティスに基づいた構造化されたAngularアプリケーションです。

```
src/
├── app/
│   ├── core/                      # アプリケーションの核心機能
│   │   ├── interfaces/            # TypeScript インターフェース定義
│   │   │   ├── company.interface.ts    # Company型、CompanyType、CompanyStatus
│   │   │   └── api-response.interface.ts # API共通レスポンス型
│   │   ├── services/             # グローバルサービス
│   │   │   ├── api.service.ts         # HTTP基盤サービス
│   │   │   └── error-handler.service.ts # エラーハンドリング
│   │   └── interceptors/         # HTTP インターセプター
│   │       └── api.interceptor.ts     # ベースURL、エラー処理
│   │
│   ├── features/                 # 機能別モジュール
│   │   └── companies/           # 鉄道会社管理機能（API準拠）
│   │       ├── components/      # フィーチャー固有のコンポーネント
│   │       │   ├── company-list/      # 会社一覧（ページネーション付き）
│   │       │   ├── company-detail/    # 会社詳細表示
│   │       │   ├── company-form/      # 作成・更新フォーム
│   │       │   └── company-filters/   # 検索・フィルタ機能
│   │       ├── pages/          # ページコンポーネント
│   │       │   ├── companies-list.page.ts    # 一覧画面
│   │       │   └── company-detail.page.ts    # 詳細画面
│   │       ├── services/       # フィーチャー固有のサービス
│   │       │   └── company.service.ts        # Companies API連携
│   │       └── state/          # 状態管理
│   │           ├── company.state.ts          # AppState実装
│   │           └── company.actions.ts        # 状態操作
│   │
│   └── shared/                  # 共有リソース
│       ├── components/         # 再利用可能コンポーネント
│       │   ├── pagination/            # ページネーション
│       │   ├── loading-spinner/       # ローディング表示
│       │   └── error-message/         # エラー表示
│       ├── pipes/             # カスタムパイプ
│       │   └── company-type.pipe.ts   # CompanyType表示用
│       ├── directives/        # カスタムディレクティブ
│       └── utils/             # ユーティリティ関数
│           └── csv-processor.util.ts  # CSV→JSON変換
│
├── assets/                      # 静的リソース
│   └── data/                   # データファイル
│       ├── raw/               # 生データ（CSV等）
│       │   ├── company20250604.csv    # 鉄道会社生データ
│       │   └── SPEC.md               # データ仕様書
│       └── processed/         # 処理済みデータ（JSON）
│           └── companies.json        # API形式変換済みデータ
│
├── docs/                       # ドキュメント
│   └── data-specs/            # データ仕様書
└── API.md                      # バックエンドAPI仕様書
```

### アーキテクチャ原則

#### 1. 画面・コンポーネント配置
- **Pages**: `src/app/features/[feature]/pages/` - ルーティング対象の画面コンポーネント
- **Components**: `src/app/features/[feature]/components/` - フィーチャー内の再利用コンポーネント
- **Shared Components**: `src/app/shared/components/` - 複数フィーチャー間で共有するコンポーネント

#### 2. バックエンド連携（API統合）
- **API Base**: `http://localhost:3000` - バックエンドAPI
- **Swagger UI**: `http://localhost:3000/api` - API仕様確認
- **Core Services**: `src/app/core/services/api.service.ts` - HTTP基盤、エラーハンドリング
- **Feature Services**: `src/app/features/companies/services/company.service.ts` - Companies API呼び出し
- **Interceptors**: `src/app/core/interceptors/api.interceptor.ts` - ベースURL設定、共通処理

#### 3. データ管理・状態管理
- **Type Definitions**: `src/app/core/interfaces/` - Company、APIレスポンス型定義
- **State Management**: `src/app/features/companies/state/` - 状態管理（AppState実装）
- **Raw Data**: `src/assets/data/raw/` - CSV生データ、仕様書
- **Processed Data**: `src/assets/data/processed/` - JSON変換済みデータ

#### 4. UI・UXコンポーネント
- **Feature Pages**: 一覧表示、詳細表示、CRUD操作画面
- **Shared Components**: ページネーション、ローディング、エラー表示
- **Custom Pipes**: CompanyType、CompanyStatus表示用
- **Responsive Design**: モバイル対応

#### 5. 開発・運用
- **Utils**: `src/app/shared/utils/` - CSV処理、データ変換ユーティリティ
- **Documentation**: `API.md` - バックエンド仕様書、`docs/` - データ仕様書
- **Error Handling**: ユーザーフレンドリーなエラー表示とログ記録

## 開発サーバー起動

```bash
ng serve
```

ブラウザで `http://localhost:4200/` にアクセスしてください。

## ビルド

```bash
ng build
```

## テスト

```bash
ng test
```

## 主要実装機能（API.md準拠）

### 1. 鉄道会社管理機能
- **一覧表示**: ページネーション、検索、フィルタリング機能
- **詳細表示**: 会社情報の詳細表示
- **CRUD操作**: 作成、更新、削除機能
- **マスターデータ**: 事業者区分、運用状態の選択肢

### 2. API統合
- **RESTful API**: 8つのエンドポイント完全対応
- **エラーハンドリング**: HTTPステータスコード別の適切な処理
- **型安全性**: TypeScript interfaceによる完全な型定義

### 3. 推奨状態管理構造
```typescript
interface AppState {
  companies: {
    data: Company[];
    loading: boolean;
    error: string | null;
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
    filters: {
      search: string;
      companyType?: CompanyType;
      status?: CompanyStatus;
    };
  };
}
```
