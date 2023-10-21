
import React from 'react'
import { Form, Space, Row, Col, Input, Button } from 'antd'
import styles from './index.module.scss'

export default function Seach (props) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [form] = Form.useForm();

    const onFinish = () => {
        const values = form.getFieldsValue()
    }
    const onReset = () => {
        form.resetFields();
    };
    return <Form
        form={form}
        onFinish={onFinish}
    >
        <Row className={styles.rankScreening}>
            <Col span={5} className={styles.col}>
                <Form.Item
                    name={`id`}
                    label={`房间号`}
                    {...{
                        wrapperCol: { span: 18 },
                    }}
                >
                    <Input className={styles.rankSelection} placeholder="请输入房间ID" allowClear />
                </Form.Item></Col>
                <Col span={5} className={styles.col}>
                <Form.Item
                    name={`name`}
                    label={`房间名称`}
                    {...{
                        wrapperCol: { span: 18 },
                    }}
                >
                    <Input className={styles.rankSelection} placeholder="请输入房间名称" allowClear />
                </Form.Item></Col>
            <Col span={5} className={styles.col}>
                <Form.Item
                    label={``}
                > <Space><Button shape="round" onClick={() => onFinish()} type='primary'>查询</Button>
                        <Button shape="round" onClick={() => onReset()}>重置</Button></Space></Form.Item>
            </Col>
        </Row>
    </Form>
}