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
    { title: '房间号', dataIndex: 'id', key: 'id' },
    { title: '房间名称', dataIndex: 'name', key: 'name',
    render:(r,row) => {
      return <div className={styles.titleBox}><span className={styles.title} >{r}</span></div>
    } },
    {
      title: '房间封面', dataIndex: 'name', key: 'name',
      align:"center",

      render: (r, row) => {
        return <div className={styles.titleBox}>{getImg(row)}</div>
      }
    },
    { title: '注册时间', dataIndex: 'time', key: 'time' },
    {
      title: '操作', dataIndex: 'option', key: 'option',
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
            <a  className={styles.delete}>删除</a>

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

    /></>
}

export default App;