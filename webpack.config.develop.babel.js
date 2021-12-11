import webpack from "webpack";

export default {
  // ビルドの起点となるファイルの設定
  entry: ["./src/index.js"],
  // 出力されるファイルの設定
  output: {
    publicPath: "/",
    path: `${__dirname}/public/`, // 出力先のパス
    filename: "bundle.js", // 出力先のファイル名
  },
  // ローカルサーバの設定
  devServer: {
    static: {
      directory: "./public",
    },
  },
  resolve: {
    // importする拡張子の指定
    extensions: [".js"],
  },
  // ソースマップの設定
  devtool: "inline-source-map",
  // loaderの設定
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
  plugins: [
    // hotモードに必要なプラグイン
    new webpack.HotModuleReplacementPlugin(),
  ],
};
