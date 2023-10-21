import React from 'react';
import styles from './index.module.scss'
import avator from '@/assets/images/avator.png';

 
class TopHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }
 
    render() {
        return (
            <div className={styles.header}>
                
                <div className={styles.avator}>
                 <img src={avator} alt="logo" className={styles.img}/>
                 张三
            </div>
            </div>
        )
    }
}

export default TopHeader;