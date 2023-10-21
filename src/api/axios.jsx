/* eslint-disable import/no-anonymous-default-export */

import axios from "axios";
import { message, } from 'antd';

//内存中正在请求的数量
let loadingNum = 0;
function startLoading() {
    if (loadingNum === 0) {
        message.loading({
            content: '拼命加载中...',
            background: 'rgba(255,255,255,0.5)',
            key: 'axio-request',
        })
    }
    //请求数量加1
    loadingNum++;
}
function endLoading() {
    //请求数量减1
    loadingNum--
    if (loadingNum <= 0) {
        message.destroy('axio-request')
    }
}





const RequestEnums = {
    TIMEOUT: 10000, // 请求超时 request timeout
    FAIL: 500, // 服务器异常 server error
    LOGINTIMEOUT: 401, // 登录超时 login timeout
    SUCCESS: 200, // 请求成功 request successfully
}
// axios 基础配置

const config = {
    // 默认地址，可以使用 process Node内置的，项目根目录下新建 .env.development
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: RequestEnums.TIMEOUT, // 请求超时时间
    withCredentials: true, // 跨越的时候允许携带凭证
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String("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")
      }
}
class Request {

    constructor(config) {
        // 实例化 serice
        this.service = axios.create(config);

        /**
         * 请求拦截器
         * request -> { 请求拦截器 } -> server
         */
        this.service.interceptors.request.use(
            (config) => {
                startLoading();
                return config;
            },
            (error) => {
                // 请求报错
                Promise.reject(error)
            }
        );

        /**
         * 响应拦截器
         * response -> { 响应拦截器 } -> client
         */
        this.service.interceptors.response.use(
            (response) => {
                const { data, } = response;
                endLoading();
                if (data.code === RequestEnums.LOGINTIMEOUT) {
                    // 表示登录过期，需要重定向至登录页面
                }
                if (data.code && data.code !== RequestEnums.SUCCESS) {
                    message.error(data);
                    return Promise.reject(data);
                }
                return data
            },
            (error) => {
                endLoading();
                const { response } = error;
                if (response) {
                    this.handleCode(response.status);
                }
                if (!window.navigator.onLine) {
                    message.error("网络连接失败，请检查网络");
                    // 可以重定向至404页面
                }
                // return null
            }

        )
    }

    handleCode = (code) => {
        switch (code) {
            case 401:
                message.error("登陆失败，请重新登录");
                break;
            case 500:
                message.error("请求异常，请联系管理员");
                break;
            default:
                message.error('请求失败');
                break;
        }
    }

    // 通用方法封装
    get(url, params){
        return this.service.get(url, { params });
    }
    post(url, params){
        return this.service.post(url, params);
    }
    put(url, params){
        return this.service.put(url, params);
    }
    delete(url, params){
        return this.service.delete(url, { params });
    }
}

export default new Request(config)