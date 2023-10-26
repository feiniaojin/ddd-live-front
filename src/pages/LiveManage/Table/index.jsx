import React from 'react';
import { Table, Popconfirm } from 'antd';
import styles from './index.module.scss'
import { FileWordTwoTone, FileExcelTwoTone } from '@ant-design/icons';
import folder from '@/assets/images/folder.png';
import {writeToClipboard } from '@/utils'

const getImg = (r) => {
  let img;
  switch (r.type) {
    case "1":
      img = <FileWordTwoTone className={styles.icon} />;
      break
    case "2":
      img = <FileExcelTwoTone className={styles.icon} />;
      break
    case "person":
      img = <img src={r.avator} alt="logo" className={styles.icon} />;
      break
    default:
      img = <img src={folder} alt="logo" className={styles.icon} />;

  }
  return img
}




const App = (props) => {
  const columns = [
    { title: '推流ID', dataIndex: 'id', key: 'id',      align:"center", },
  { title: '房间号', dataIndex: 'name', key: 'name',      align:"center", },
  { title: '直播号', dataIndex: 'name', key: 'name' ,      align:"center",},
  { title: '简介', dataIndex: 'description', key: 'description' ,      align:"center",},
  { title: '计划开播时间', dataIndex: 'time', key: 'time' ,      align:"center",},
  { title: '计划下播时间', dataIndex: 'time', key: 'time',      align:"center", },
  { title: '直播状态', dataIndex: 'status', key: 'status' ,      align:"center",},
  { title: '操作', dataIndex: 'option', key: 'option' ,
   align:"center",
   width:330,

   render:(r,row) => {
    return <div className={styles.option}>
        <a className={styles.edit} onClick={() => { props.onEdit(true, row) }}>编辑</a>
          <Popconfirm
            title="提示"
            description="确定要删除该条数据吗?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              console.log('删除')
            }}
          >
            <a className={styles.delete}>删除</a>

          </Popconfirm>
     {row.url&& <a className={styles.other} onClick={()=>{
          props.handleButtonClick(true,row.url);

      }}>直播预览</a>}
      <a
      onClick={()=>{
        writeToClipboard('推流地址',"推流地址已成功复制到剪贴板！");

    }}
    className={styles.other}
      > 推流地址</a>
    </div>
  }  },

  ];
  return <>
    <div className={styles.driver}></div>
    <Table
      columns={columns}
      rowSelection={{}}
      dataSource={props.list}
      scroll={{ y: 300 }}

    /></>
}

export default App;