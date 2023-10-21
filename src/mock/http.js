//模拟的请求数据
const funcs= {
  getUser: () => {
    return {
      code: 200,
      data: {
        userName: '张三',
        phone: '131xxxxxx'
      },
      success: true,
      msg: "success"
    };
  },
};
export default funcs

