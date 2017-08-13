## Redux 只是一种模式
1. 修改数据的门槛：你必须先 dispatch 执行某些允许的修改操作，而且在action里面申明。
2. createStore，它可以产生 store，里面包含 getState 和 dispatch 函数，方便我们使用。
`return { getState, dispatch, Subscribe}`
3. 手动重新渲染非常麻烦，我们希望自动重新渲染视图。所以后来加入了订阅者模式，可以通过 subscribe 订阅数据修改事件，每次数据更新的时候自动重新渲染视图。
4. 重新渲染视图”有比较严重的性能问题，我们引入了“共享结构的对象”来帮我们解决问题
5. 定义了 reducer 只能是纯函数，功能就是负责初始 state，和根据 state 和 action 计算具有共享结构的新的 state。
immutable
6. createStore 现在可以直接拿来用了:
```js
// 定一个 reducer
function reducer (state, action) {
  /* 初始化 state 和 switch case */
}
// 生成 store
const store = createStore(reducer)

// 监听数据变化重新渲染页面
store.subscribe(() => renderApp(store.getState()))

// 首次渲染页面
renderApp(store.getState()) 

// 后面可以随意 dispatch 了，页面自动更新
store.dispatch(...)
```