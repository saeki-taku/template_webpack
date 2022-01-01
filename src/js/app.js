import "js/sub"
// import "../scss/app.scss"
// import "@scss/app"

setTimeout(() => {
  import("@scss/app") // 非同期に読み込む
}, 2000)

// import jQuery from "jquery"; //ProvidePluginによって適用される為不要

const init = async () => {
  utils.log('hello from app.js')
  await asyncFn()
  jQuery()
}

async function asyncFn() {
  console.log([1, 2, 3].includes(0))
}
init()
