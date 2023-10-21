import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

// 创建 Store 实例
const store = createStore(
  // 参数一：根 reducer
  rootReducer,

  // 参数二：初始化时要加载的状态
  {},

  // 参数三：增强器
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

// 导出 Store 实例
export default store