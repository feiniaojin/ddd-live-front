import { useNavigate } from 'react-router-dom'
// 高阶组件包装useNavigate()功能
// 原因：类组件中无法使用useNavigate()，会报错
// React Hook "useNavigate" cannot be called in a class component.
function widthUseNavigate(WrapCompontent) {
  // 设置别名
  WrapCompontent.displayName = `widthUseNavigate${getDisplayName(WrapCompontent)}`
  return function NavigateCompont() {
    const navigate = useNavigate()
    // 给传入的组件新增一个to方法，传给原始组件的props，在原始组件中通过this.props.to(参数)使用
    return <WrapCompontent to={navigate}></WrapCompontent>
  }
}
 
// 别名
function getDisplayName(WrapCompontent) {
  return WrapCompontent.displayname || WrapCompontent.name || 'Component'
}
 
export default widthUseNavigate