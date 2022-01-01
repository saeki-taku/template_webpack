module.exports = api => {
  api.cache(true);

  return {
      "presets": [
          ["@babel/preset-env", {
              targets: [
                  "last 1 version",
                  "> 1%",
                  "maintained node versions",
                  "not dead"
              ],
              useBuiltIns: "usage", //必要な機能だけをjsファイルから静的に解析して追加してくれる
              corejs: 3 //core.jsのバージョンのしてする必要がある
          }]
      ]
  }
}
