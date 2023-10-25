import React from 'react';
import { Table, Popconfirm } from 'antd';
import styles from './index.module.scss'
import { FileWordTwoTone, FileExcelTwoTone } from '@ant-design/icons';
import folder from '@/assets/images/folder.png';

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
    { title: '主播ID', dataIndex: 'id', key: 'id' },
    {
      title: '主播名称', dataIndex: 'name', key: 'name',
      align:"center",
      render: (r, row) => {
        return <div className={styles.titleBox}><span className={styles.title} >{r}</span></div>
      }
    },
    {
      title: '主播头像', dataIndex: 'name', key: 'name',
      align:"center",

      render: (r, row) => {
        return <div className={styles.titleBox}>{getImg(row)}</div>
      }
    },
    { title: '注册时间', dataIndex: 'time', key: 'time',      align:"center",
  },
    { title: '账号状态', dataIndex: 'status', key: 'status',      align:"center", },
    {
      title: '操作', dataIndex: 'option', key: 'option',
    align:"center",
      width:180,
      render: (r, row) => {
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
            <a className={styles.delete}  >删除</a>

          </Popconfirm>

        </div>
      }
    },
  ];
  return <>
    <div className={styles.driver}></div>
    <Table
      columns={columns}
      rowSelection={{}}
      dataSource={props.list}
      scroll={{ y: 300 }}
      bordered	
      // borderColor	
    /></>
}

export default App;