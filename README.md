# Deck.gl ミニマルテンプレート (React + Vite)

このプロジェクトは、[Deck.gl](https://deck.gl/) アプリケーションを [React](https://react.dev/) と [Vite](https://vitejs.dev/) を使用して作成するための最小限のテンプレートです。Google Maps をベースマップとして使用し、GeoJSONデータを可視化します。

## 主な特徴

-   **Deck.gl**: WebGLを利用した高性能な地理空間情報可視化ライブラリ。
-   **React**: ユーザーインターフェース構築のためのライブラリ。
-   **Vite**: 高速な開発サーバーと最適化されたビルドツール。
-   **Google Maps**: ベースマップを提供。
-   **GeoJSON**: 都道府県境界データを表示。
-   **ESLint**: コードの静的解析ツール。

## プロジェクト構成

-   `src/main.jsx`: アプリケーションのエントリーポイント。
-   `src/App.jsx`: Deck.glのキャンバスとGoogle Mapsを統合するメインのReactコンポーネント。
-   `src/Layers/index.js`: マップレイヤーを定義 (現在はGeoJSONレイヤー)。
-   `public/data/pref.geojson`: 都道府県境界データ。
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
3.  Google Maps API キーを設定します:
    ```bash
    cp .env.example .env
    ```
    `.env` ファイルに有効なGoogle Maps API キーを設定してください:
    ```
    VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
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
-   **GeoJSONデータ**: `public/data/pref.geojson` のデータを変更することで、異なる地理データを表示できます。

## Google Maps API キーについて

このプロジェクトでは[Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript)を使用しています。API キーの取得方法については、Googleの公式ドキュメントを参照してください。
