
import React from "react";
import WujieReact from "wujie-react";
// 保活模式，name相同则复用一个子应用实例，改变url无效，必须采用通信的方式告知路由变化
 const Wujie = () => {
  return (
    <div>
      <WujieReact
      width="100%"
      height="100%"
      name={window.location.href}
      url={'xxx'}
      alive={true}
    ></WujieReact>
    </div>
    
  );
}
export default Wujie