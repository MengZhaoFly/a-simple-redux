import createStore from './createStore.js'

function renderApp(appState, newState = {}) {
  if (appState === newState) return false
  renderTitle(appState.title, newState.title)
  renderContent(appState.content, newState.content)
}

function renderTitle(title, newTitle = {}) {
  if (title === newTitle) return false
  const titleDOM = document.getElementById('title')
  titleDOM.innerHTML = newTitle.text
  titleDOM.style.color = newTitle.color
}
// need a obj to render
function renderContent(content, newContent = {}) {
  if (content === newContent) return false
  const contentDOM = document.getElementById('content')
  contentDOM.innerHTML = newContent.text
  contentDOM.style.color = newContent.color
}
// type decide text/color
function stateChange(state, action) {
  if (!state) {
    return {
      title: {
        text: 'React.js 小书',
        color: 'red',
      },
      content: {
        text: 'React.js 小书内容',
        color: 'blue'
      }
    }
  }
  switch (action.type) {
    case 'UPDATE_TITLE_TEXT':
      return {
        ...state,
        title: {
          ...state.title,
          text: action.text
        }
      }
    case 'UPDATE_CONTEXT_COLOR':
      return {
        ...state,
        content: {
          ...state.content,
          color: action.color
        }
      }
    default:
      return state;
  }
  // return new object
}
const store = createStore(stateChange)
// 订阅完成 state改变自动更新
let oldState = store.getState()
store.Subscribe(() => {
  let newState = store.getState()
  renderApp(oldState, newState)
  oldState = newState
})
renderApp(oldState);
store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: '这是标题' })
store.dispatch({ type: 'UPDATE_CONTEXT_COLOR', color: '#eeeeee' })