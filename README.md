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
│   │   ├── services/             # グローバルサービス
│   │   └── interceptors/         # HTTP インターセプター
│   │
│   ├── features/                 # 機能別モジュール
│   │   └── train-map/           # 電車路線図機能
│   │       ├── components/      # フィーチャー固有のコンポーネント
│   │       ├── pages/          # ページコンポーネント
│   │       └── services/       # フィーチャー固有のサービス
│   │
│   └── shared/                  # 共有リソース
│       ├── components/         # 再利用可能コンポーネント
│       ├── pipes/             # カスタムパイプ
│       ├── directives/        # カスタムディレクティブ
│       └── utils/             # ユーティリティ関数
│
├── assets/                      # 静的リソース
│   └── data/                   # データファイル
│       ├── raw/               # 生データ（CSV等）
│       └── processed/         # 処理済みデータ（JSON）
│
└── docs/                       # ドキュメント
    └── data-specs/            # データ仕様書
```

### アーキテクチャ原則

#### 1. 画面・コンポーネント配置
- **Pages**: `src/app/features/[feature]/pages/` - ルーティング対象の画面コンポーネント
- **Components**: `src/app/features/[feature]/components/` - フィーチャー内の再利用コンポーネント
- **Shared Components**: `src/app/shared/components/` - 複数フィーチャー間で共有するコンポーネント

#### 2. バックエンド連携
- **Core Services**: `src/app/core/services/` - API基盤サービス（認証、HTTP設定等）
- **Feature Services**: `src/app/features/[feature]/services/` - フィーチャー固有のAPI呼び出し
- **Interceptors**: `src/app/core/interceptors/` - HTTP リクエスト・レスポンスの共通処理

#### 3. データ管理
- **Raw Data**: `src/assets/data/raw/` - 外部から取得した生データ
- **Processed Data**: `src/assets/data/processed/` - アプリで利用可能な形式に変換済みデータ
- **Interfaces**: `src/app/core/interfaces/` - データ構造の型定義

#### 4. 開発・運用
- **Utils**: `src/app/shared/utils/` - データ処理、変換ユーティリティ
- **Docs**: `docs/data-specs/` - データ仕様書、API仕様書

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
