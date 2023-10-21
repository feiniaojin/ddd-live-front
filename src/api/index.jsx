import request from './axios';
//获取用户信息
export const getUserInfo = () => {
    console.log('request',request)
    return request.get('/api/getUser',{
    })
};
