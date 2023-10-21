
import React, { useState} from 'react'
import styles from './index.module.scss'
import { FileWordTwoTone,Html5TwoTone ,FileExcelTwoTone} from '@ant-design/icons';
import {Col } from 'antd'
import folder from '@/assets/images/folder.png';

export default function CardView(props) {
    const {span,r,key, onDelete, onEdit, onAbilityQuality, } = props;
    const [hover, onHover] = useState(false);
    const getImg=()=>{
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
    return <Col span={span} key={key} 
    onMouseEnter={() => onHover(true)}
    onMouseLeave={() => onHover(false)}
    >
    <div className={styles.rowCardBox}>
    {r.isVp&&<Html5TwoTone className={styles.publishFlag} twoToneColor="red" />}
        <div className={styles.content}> {getImg()}</div>
        <div className={styles.footer}>
            <div className={styles.title} title={r.levelGrade}>{
                r.name
            }</div>
        </div>
        {hover&&<div className={styles.buttonGroup}>
        <span className={styles.button}  onClick={()=>onAbilityQuality&&onAbilityQuality(r)} >
            查看
            </span>
            <span className={styles.button} onClick={()=>onEdit&&onEdit(r)} >
            通过
            </span>
        <span className={styles.button}  onClick={()=>onDelete&&onDelete(r)}>
            删除
            </span>
          
        </div>}
    </div>
</Col>
}
