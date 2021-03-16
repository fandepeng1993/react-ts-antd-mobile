import React from 'react';
import './style/index.less'
import styles from './App.module.less';
import {Button, LocaleProvider} from "antd-mobile";
import {useTranslation} from 'react-i18next';
import './style/index.less';
import {Switch, HashRouter} from 'react-router-dom';
import routes, {RouteWithSubRoutes} from '@/router';
import enUS from 'antd-mobile/lib/locale-provider/en_US';
import {Lang} from "@/types";
import {getToken} from '@/utils/cookie'
import {useDispatch, useSelector} from "react-redux";
import {CURRENTER, UPDATELANGUAGE} from "@/store/actions";

const antLangEnum = {
    zh: undefined,
    en: enUS,
};


function App() {
    const lng: Lang = useSelector((state: any) => state.language);
    const {i18n} = useTranslation();
    const dispatch = useDispatch();
    React.useEffect(() => {
        // 项目初始化操作
        const token = getToken();
        // 刷新页面获取当前用户数据
        if (token) {
            dispatch({type: CURRENTER.GETCURRENTER});
        }
    }, [dispatch]);
    React.useEffect(() => {
        // console.log(lng, 'asdasdasdasdasdasdasd--------')
        // 设置antd 中英文
        // 设置react-i18next 中英文
        i18n.changeLanguage(lng);
        dispatch({type: UPDATELANGUAGE, payload: lng});
    }, [i18n, lng, dispatch]);
    const changeLanguage = () => {
        dispatch({type: UPDATELANGUAGE, payload: lng==='zh'?'en':'zh'});
    };

    return (
        <LocaleProvider locale={antLangEnum[lng] as any}>
            <div className="App">
                <div className={styles.aa}>iiiii</div>
                <Button onClick={changeLanguage} type="primary">切换语言</Button>
                <HashRouter>
                    <Switch>
                        {routes.map((route, i) => (<RouteWithSubRoutes key={i} {...route} />))}
                    </Switch>
                </HashRouter>
            </div>
        </LocaleProvider>
    );
}

export default App;
