/** 返回一个修改后的状态 触发修改的函数  
 */
export default (state, stateChange) => {
    const listeners = []
    // 订阅
    const Subscribe = (listener) => listeners.push(listener)
    const getState = () => state
    // 指定了哪种state action的type action的text
    const dispatch = (action) => {
        state = stateChange(state, action)
        listeners.forEach( listener => listener())
    }
    // 订阅
    return { getState, dispatch, Subscribe}
}
