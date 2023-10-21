import React, { useState,useRef,  } from 'react'
import styles from './index.less'
import { Button  } from 'antd';
import { useMount } from 'ahooks';
import { DatabaseTwoTone, AppstoreTwoTone,QuestionCircleTwoTone } from '@ant-design/icons';
import Table from './Table'
import Card from '@/components/Card'
import Seach from './Seach'
import {getUserInfo} from '@/api/index.jsx'


const data = [
    {
      key: 3,
      name: '王者荣耀2000冲分',
      age: 29,
      id:'0000523',
      address: 'Jiangsu No. 1 Lake Park',
      description: 'This not expandable',
      type:"person",
      isVp:true,
      time:"2023-06-19 13:50:59",
      status:"正常",
      avator:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F54ce65a6-c356-4cb1-84cb-da83cec1c846%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1700465591&t=400c39350093e083f342e6a34ffad7f7"
    },
    {
      key: 4,
      id:'00001980',
      name: 'lisa 美妆',
      age: 32,
      type:"person",
      address: 'Sydney No. 1 Lake Park',
      description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
      avator:"https://img0.baidu.com/it/u=2779786549,2320236013&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
      time:"2023-08-07 9:00:00",
      status:"正常"
    },
  ];
export default function ListView(props) {
  const [view, setView] = useState('1');
  const [list, setList] = useState([]);

  useMount(() => {
         getUserInfo().then(user=>{
          setList(data)
        })
           
    })

    return <div className={styles.Container}>
        <Seach />
          <div className={styles.changeView}>
                <Button size='small' type={view === '1' ? 'primary' : "default"} className={styles.button} icon={<AppstoreTwoTone />} onClick={() => {
                    setView('1')
                }}>卡片</Button>
                <Button size='small' type={view === '2' ? 'primary' : "default"} className={styles.button} icon={<DatabaseTwoTone />} onClick={() => {
                    setView('2')
                }}>列表</Button>
      
            </div>
            {view === '1' ?
                <Card list={list}/>
                : <Table list={list} />
            }  

    </div>
}