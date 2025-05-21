# Deck.gl ミニマルテンプレート (React + Vite)

このプロジェクトは、[Deck.gl](https://deck.gl/) アプリケーションを [React](https://react.dev/) と [Vite](https://vitejs.dev/) を使用して作成するための最小限のテンプレートです。OpenStreetMap タイルを使用した基本的な地図を表示します。

## 主な特徴

-   **Deck.gl**: WebGLを利用した高性能な地理空間情報可視化ライブラリ。
-   **React**: ユーザーインターフェース構築のためのライブラリ。
-   **Vite**: 高速な開発サーバーと最適化されたビルドツール。
-   **OpenStreetMap**: ベースマップタイルを提供。
-   **ESLint**: コードの静的解析ツール。

## プロジェクト構成

-   `src/main.jsx`: アプリケーションのエントリーポイント。
-   `src/App.jsx`: Deck.glのキャンバスと初期ビューを設定するメインのReactコンポーネント。
-   `src/Layers/index.js`: マップレイヤーを定義 (現在はOpenStreetMapの`TileLayer`のみ)。
-   `index.html`: メインのHTMLファイル。
-   `package.json`: 依存関係とスクリプトをリスト化。

## 利用開始方法

### 前提条件

-   [Node.js](https://nodejs.org/) (バージョン 18.x 以降を推奨)
-   [npm](https://www.npmjs.com/) (Node.jsに同梱)

### インストール

1.  リポジトリをクローンします:
    ```bash
    git clone <リポジトリURL>
    cd <リポジトリディレクトリ>
    ```
2.  依存関係をインストールします:
    ```bash
    npm install
    ```

### 開発サーバーの起動

ホットモジュールリプレイスメント (HMR) を備えた開発サーバーを起動するには:

```bash
npm run dev
```

通常、これによりウェブブラウザで `http://localhost:5173` にてアプリケーションが開かれます。

### 本番環境向けビルド

最適化された本番環境向けビルドを作成するには:

```bash
npm run build
```

出力ファイルは `dist` ディレクトリに格納されます。

### リンティング

コードのリンティングを実行するには:

```bash
npm run lint
```

## カスタマイズ

-   **地図表示**: `src/App.jsx` 内の `INITIAL_VIEW_STATE` を変更することで、デフォルトの緯度、経度、ズームレベルなどを変更できます。
-   **マップレイヤー**: `src/Layers/index.js` の `renderLayers` 関数を更新することで、レイヤーを追加・変更できます。Deck.glの様々なレイヤーについては[こちら](https://deck.gl/docs/api-reference/layers)を参照してください。
