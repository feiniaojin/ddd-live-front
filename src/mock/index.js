//引入mock进行请求/拦截请求接口
import Mock from "mockjs";
//导入模拟的数据
import httpdata from "./http.js";
//拦截请求返回模拟的数据（当访问这个接口时，返回响应的数据）
//第一个参数是请求的接口api,第二个参数是请求方式get/post,第三个参数是一个函数(数据),
Mock.mock("/api/getUser", "get", httpdata.getUser);

