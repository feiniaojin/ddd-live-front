import React from 'react';
import { Table } from 'antd';
import styles from './index.module.scss'
import { FileWordTwoTone ,FileExcelTwoTone} from '@ant-design/icons';
import folder from '@/assets/images/folder.png';

const getImg=(r)=>{
  let img;
  switch(r.type){
      case "1":
          img=<FileWordTwoTone className={styles.icon} />;
          break
          case "2":
              img=<FileExcelTwoTone className={styles.icon} />;
              break
              case "person":
                img=<img src={r.avator} alt="logo" className={styles.icon}/>;
                break
          default:
              img=<img src={folder} alt="logo" className={styles.icon}/>;

  }
  return img
}
const columns= [
  { title: '房间号', dataIndex: 'id', key: 'id' },
  { title: '房间名称', dataIndex: 'name', key: 'name',
  render:(r,row) => {
    return <div className={styles.titleBox}>{getImg(row)}<span className={styles.title} >{r}</span></div>
  } },
  { title: '注册时间', dataIndex: 'time', key: 'time' },
];



const App = (props) => (
  <>
  <div className={styles.driver}></div>
  <Table
    columns={columns}
    rowSelection={{}}
    dataSource={props.list}
    scroll={{y:300}}

    // pagination={false}
  /></>
);

export default App;