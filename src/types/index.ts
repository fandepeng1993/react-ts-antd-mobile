import {RouteProps} from "react-router";

export type Lang = 'zh' | 'en';

export interface PromiseResult {
    ['index']: any
}

export type RouterPropsCustom = RouteProps & { Auth?: Boolean }