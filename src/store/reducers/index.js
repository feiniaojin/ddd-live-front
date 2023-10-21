import { combineReducers } from 'redux'

// 组合各个 reducer 函数，成为一个根 reducer
const rootReducer = combineReducers({
  // 一个测试用的 reducer，避免运行时因没有 reducer 而报错
  test: (state = 0, action) => (state)

  // 在这里配置有所的 reducer ...
})

// 导出根 reducer
export default rootReducer