
import React, {  useState } from 'react'
import { Row } from 'antd'
import styles from './index.module.scss'
import CardView from './CardView'
import { useMount, useUnmount } from 'ahooks';



export default function Card(props) {
  const { list, onDelete, onEdit, onAbilityQuality, } = props;
  const [span, setSpan] = useState(6);
  useMount(() => {
    window.addEventListener('resize', goResizeListener);
    setTimeout(() => {
      goResizeListener()
    }, 100)
  })
  useUnmount(() => {
    window.removeEventListener('resize', goResizeListener);

  })
  const goResizeListener = () => {
    let row;
    row = document.querySelector('#list-to-row');
    let span = 0;
    if (row) {
      if (row.offsetWidth >= 2284) {
        span = 3;
      } else if (row.offsetWidth >= 1419) {
        span = 4;
      } else if (row.offsetWidth >= 876) {
        span = 6;
      } else if (row.offsetWidth >= 736) {
        span = 8;
      } else {
        span = 12;
      }
      setSpan(span)
    }
  }
  return <>
    <div className={styles.driver}></div><Row className={styles.rowBox} id='list-to-row'>
      {
        list.map(r => {
          return <CardView
            r={r}
            span={span}
            onAbilityQuality={onAbilityQuality}
            onEdit={onEdit}
            onDelete={onDelete}
            key={r.key}
          />

        })
      }

    </Row></>
}
