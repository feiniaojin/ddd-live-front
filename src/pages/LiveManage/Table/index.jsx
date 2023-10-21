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
  { title: '推流ID', dataIndex: 'id', key: 'id' },
  { title: '房间号', dataIndex: 'name', key: 'name' },
  { title: '直播号', dataIndex: 'name', key: 'name' },
  { title: '简介', dataIndex: 'description', key: 'description' },
  { title: '计划开播时间', dataIndex: 'time', key: 'time' },
  { title: '计划下播时间', dataIndex: 'time', key: 'time' },
  { title: '直播状态', dataIndex: 'status', key: 'status' },
  { title: '操作', dataIndex: 'option', key: 'option' ,
   render:(r,row) => {
    return <div className={styles.option}>
      <a>直播预览</a>
      <a> 推流地址</a>
    </div>
  }  },

];



const App = (props) => (
  <>
  <div className={styles.driver}></div>
  <Table
    columns={columns}
    rowSelection={{}}
    dataSource={props.list}
    scroll={{y:300}}

  /></>
);

export default App;