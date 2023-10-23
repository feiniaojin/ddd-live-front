import React, { useState, useRef } from 'react'
import styles from './index.module.scss'
import { Button, Tour } from 'antd';
import { useMount } from 'ahooks';
import { DatabaseTwoTone, AppstoreTwoTone, QuestionCircleTwoTone,PlusOutlined } from '@ant-design/icons';
import Table from './Table'
import Card from '@/components/Card'
import Seach from './Seach'
import { getUserInfo } from '@/api/index.jsx'
import Model from './Model'
import {clsnames } from '@/utils'

const data = [
  {
    key: 3,
    name: '王者荣耀2000冲分',
    age: 29,
    id: '0000523',
    address: 'Jiangsu No. 1 Lake Park',
    description: 'This not expandable',
    type: "person",
    isVp: true,
    time: "2023-06-19 13:50:59",
    status: "正常",
    avator: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F54ce65a6-c356-4cb1-84cb-da83cec1c846%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1700465591&t=400c39350093e083f342e6a34ffad7f7"
  },
  {
    key: 4,
    id: '00001980',
    name: 'lisa 美妆',
    age: 32,
    type: "person",
    address: 'Sydney No. 1 Lake Park',
    description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
    avator: "https://img0.baidu.com/it/u=2779786549,2320236013&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
    time: "2023-08-07 9:00:00",
    status: "正常"
  },
  {
    key: 5,
    name: 'lvcd',
    age: 29,
    id: '0000526',
    address: 'Jiangsu No. 1 Lake Park',
    description: 'This not expandable',
    type: "person",
    time: "2023-05-17 13:50:59",
    status: "正常",
    avator: "https://img1.baidu.com/it/u=2317604357,3097421941&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
  },
  {
    key: 6,
    id: '00001966',
    name: 'sss',
    age: 32,
    type: "person",
    address: 'Sydney No. 1 Lake Park',
    description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
    avator: "https://img2.baidu.com/it/u=1642897792,1115603974&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
    time: "2023-08-17 19:00:00",
    status: "正常"
  },
  {
    key: 3,
    name: '王者荣耀2000冲分',
    age: 29,
    id: '0000523',
    address: 'Jiangsu No. 1 Lake Park',
    description: 'This not expandable',
    type: "person",
    isVp: true,
    time: "2023-06-19 13:50:59",
    status: "正常",
    avator: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F54ce65a6-c356-4cb1-84cb-da83cec1c846%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1700465591&t=400c39350093e083f342e6a34ffad7f7"
  },
  {
    key: 4,
    id: '00001980',
    name: 'lisa 美妆',
    age: 32,
    type: "person",
    address: 'Sydney No. 1 Lake Park',
    description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
    avator: "https://img0.baidu.com/it/u=2779786549,2320236013&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
    time: "2023-08-07 9:00:00",
    status: "正常"
  },
  {
    key: 3,
    name: '王者荣耀2000冲分',
    age: 29,
    id: '0000523',
    address: 'Jiangsu No. 1 Lake Park',
    description: 'This not expandable',
    type: "person",
    isVp: true,
    time: "2023-06-19 13:50:59",
    status: "正常",
    avator: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F54ce65a6-c356-4cb1-84cb-da83cec1c846%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1700465591&t=400c39350093e083f342e6a34ffad7f7"
  },
  {
    key: 4,
    id: '00001980',
    name: 'lisa 美妆',
    age: 32,
    type: "person",
    address: 'Sydney No. 1 Lake Park',
    description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
    avator: "https://img0.baidu.com/it/u=2779786549,2320236013&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
    time: "2023-08-07 9:00:00",
    status: "正常"
  },
  {
    key: 3,
    name: '王者荣耀2000冲分',
    age: 29,
    id: '0000523',
    address: 'Jiangsu No. 1 Lake Park',
    description: 'This not expandable',
    type: "person",
    isVp: true,
    time: "2023-06-19 13:50:59",
    status: "正常",
    avator: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F54ce65a6-c356-4cb1-84cb-da83cec1c846%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1700465591&t=400c39350093e083f342e6a34ffad7f7"
  },
  {
    key: 4,
    id: '00001980',
    name: 'lisa 美妆',
    age: 32,
    type: "person",
    address: 'Sydney No. 1 Lake Park',
    description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
    avator: "https://img0.baidu.com/it/u=2779786549,2320236013&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
    time: "2023-08-07 9:00:00",
    status: "正常"
  },
  {
    key: 3,
    name: '王者荣耀2000冲分',
    age: 29,
    id: '0000523',
    address: 'Jiangsu No. 1 Lake Park',
    description: 'This not expandable',
    type: "person",
    isVp: true,
    time: "2023-06-19 13:50:59",
    status: "正常",
    avator: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F54ce65a6-c356-4cb1-84cb-da83cec1c846%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1700465591&t=400c39350093e083f342e6a34ffad7f7"
  },
  {
    key: 4,
    id: '00001980',
    name: 'lisa 美妆',
    age: 32,
    type: "person",
    address: 'Sydney No. 1 Lake Park',
    description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
    avator: "https://img0.baidu.com/it/u=2779786549,2320236013&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
    time: "2023-08-07 9:00:00",
    status: "正常"
  },
];
export default function ListView(props) {
  const [view, setView] = useState('1');
  const [list, setList] = useState([]);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const [open, setOpen] = useState(false);
  const [target, setTarget] = useState(null);
  const [visible, setVisible] = useState(false);
  const onEdit=(flag,data)=>{
    setTarget(data)
    setVisible(flag)
  }
  const steps = [
    {
      title: '搜索',
      description: '点击搜索去按钮进行快速检索需要的内容',

      target: () => ref1.current,
    },
    {
      title: '切换',
      description: '通过模式切换进行数据查看',
      target: () => ref2.current,
    },

  ];

  useMount(() => {
    getUserInfo().then(user => {
      setList(data)
    })

  })

  return <div className={styles.Container}>
    <Seach ref1={ref1} />
    <div className={styles.changeView}>
      <Button size='small' type={view === '1' ? 'primary' : "default"} className={styles.button} icon={<AppstoreTwoTone />} onClick={() => {
        setView('1')
      }}>卡片</Button>
      <Button size='small' type={view === '2' ? 'primary' : "default"} className={styles.button} icon={<DatabaseTwoTone />} onClick={() => {
        setView('2')
      }}   ref={ref2}>列表</Button>
      <a style={{marginLeft:'8px'}} onClick={() => setOpen(true)} title='操作指引' >
        <QuestionCircleTwoTone />

      </a>
      <Button size='small' type={'primary'} className={clsnames(styles.button,styles.toRight)} icon={<PlusOutlined />} onClick={() => {
        onEdit(true,null)
      }}>新建</Button>
    </div>
    <div ref={ref3}>
      {view === '1' ?
        <Card list={list} onEdit={onEdit}/>
        : <Table list={list} onEdit={onEdit}/>
      }  </div>
    <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
<Model visible={visible} onEdit={onEdit} target={target}/>
  </div>
}