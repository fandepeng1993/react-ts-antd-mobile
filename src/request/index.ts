import {extend, ResponseError, ResponseInterceptor, OnionOptions} from "umi-request";
import NProgress from 'nprogress'
// const {token, cancel} = CancelToken.source();
declare var BASEURL: any;
// 自定义配置axios
NProgress.configure({showSpinner: false});
const codeMap = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    405: '用户没有权限',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '请求超时。'
};


/**
 * 异常处理程序
 */

const errorHandler = (error: ResponseError) => {
    const {response, message} = error;
    if (response && response.status) {

    } else if (!response) {
        // 设置加载进度条(结束..)
        NProgress.done();
    }

    return message;
};
const request = extend({
    timeout: 0,
    errorHandler,
    // 'credentials' 发送带凭据的请求
    // 为了让浏览器发送包含凭据的请求（即使是跨域源），需要设置 credentials: 'include'
    // 如果只想在请求URL与调用脚本位于同一起源处时发送凭据，请添加credentials: 'same-origin'
    // 要改为确保浏览器不在请求中包含凭据，请使用credentials: 'omit'
    credentials: 'same-origin', // 默认请求是否带上cookie
    validateCache: () => false // 不缓存
});
// request拦截器, 改变url 或 options.
request.interceptors.request.use(
    (url, options) => {
        // 在发送请求之前做些什么
        NProgress.start(); // 设置加载进度条(开始..)
        const newUrl = BASEURL + url;
        return {
            url: `${newUrl}&interceptors=yes`,
            options: {...options, interceptors: true},
        };
    },
    {global: true}
);

// response拦截器, 处理response
request.interceptors.response.use(
    async (response: ResponseInterceptor | any, options: OnionOptions | any) => {
        if (!response) return Promise.resolve({err: 'true'});
        const data = await response.clone().json();
        // 设置加载进度条(结束..)
        NProgress.done();
        if (data.code === 510) {
            return Promise.resolve({err: data});
        }
        if (data.code !== 200) {
            // eslint-disable-next-line prefer-promise-reject-errors
            return Promise.resolve({err: data});
        }
        return response;
    }
);

export default request;