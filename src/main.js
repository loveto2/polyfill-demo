// 全量引入 必须
// import "core-js/stable"
// import "regenerator-runtime/runtime"

const promise = new Promise(resolve => {
  setTimeout(() => resolve, 1500)
})

const array = [1, 2, 3]

array.includes(2)