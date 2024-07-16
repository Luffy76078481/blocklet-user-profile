import { createAxios } from '@blocklet/js-sdk';


// demo代码 不考虑登陆 token写死
const TOKEN = 'testuesrid_asdbansdmb234923764123j1k'

// 创建 Axios 实例
const instance = createAxios({
    baseURL: window?.blocklet?.prefix || '/',
    timeout: 5000,
});

// 请求拦截器
instance.interceptors.request.use(
    (config) => {
        config.headers['Authorization'] = TOKEN;
        return config;
    },
    (error) => {
        // 处理请求发送时的错误
        return Promise.reject(error);
    }
);

// 响应拦截器
instance.interceptors.response.use(
    (response) => {
        // 处理成功的响应
        if (response.status === 200) {
            // 根据你的需求处理响应数据
            return response.data;
        } else {
            // 处理其他状态码的情况
            throw new Error(`请求失败，状态码: ${response.status}`);
        }
    },
    (error) => {
        // 处理响应错误
        if (error.response) {
            // 服务器返回了错误的状态码
            const { code = 500, message = "服务端响应错误" } = error?.response?.data;
            alert(message);
            return { code, message }
        } else if (error.request) {
            // 请求未发送成功
            const { code = 500, message = "请求服务端错误" } = error.response
            alert(message);
            return { code, message }
        } else {
            // 其他错误
            throw error;
        }
    }
);


export default instance;