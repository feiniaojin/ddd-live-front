import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import SiderLeft from './SiderLeft';
import TopHeader from './TopHeader';
import styles from './index.module.scss'
import { Skeleton } from 'antd';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    // 生命周期函数
    componentDidMount() {
        console.log('componentDidMount');
    }
    componentWillUnmount() {
        console.log('componentWillUnmount');
    }

    render() {
        return (
            <div className={styles.layout}>
                {/* 左侧导航栏 */}
                <div width={200} className={styles.left}
                >
                    {/* 渲染左侧菜单组件 */}
                    <SiderLeft />
                </div>
                {/* 头部 */}

                <div className={styles.layoutMain}>

                    <TopHeader />
                    {/* 右边区域 */}
                    <div
                        className={styles.content}
                    >
                        <Suspense fallback={<Skeleton active />}>

                            {/* 渲染子路由 匹配到子路由时，用子路由的组件替换此处内容*/}
                            {/* 类似Vue中的router-view */}
                            <Outlet />
                        </Suspense>
                    </div>
                </div>
            </div>
        )
    }
}