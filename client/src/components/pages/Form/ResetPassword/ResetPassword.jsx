import { useState } from 'react';
import api from '../../../../api/axios';
import '/src/components/pages/Form/Forms.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Card, Typography, Input, Button, Layout, Alert} from 'antd';
import { message } from 'antd';
import { LockOutlined } from '@ant-design/icons';

function ResetPassword(){ 

    const navigate = useNavigate();
    const [error, setErro] = useState();
    const {token} = useParams();
    
    const handleSubmit =  async(values) => {
        const { password } = values;
        const res = await api.post(`/reset-password/${token}`,{password});
        try {
            if(res.status === 200){
                message.success(res.data.message)
                navigate('/login');
            } 
        } catch (err) {
            if(err.response.status === 422){
                setErro(err.response.data.message)
            }else if(err.response.status === 401)  {
                setErro(err.response.data.message)
            }else if(err.response.status === 500)  {
                setErro(err.response.data.message)
            }else{
                message.error('Password recovery failed')
            }
            
        }
    } 
    return(
        <>
            <Layout className="form_container">
                <Card >
                    <Form layout='vertical ' onFinish={handleSubmit}  className="form">
                        <Typography.Title level={2} id='h2_login' strong>Reset account password</Typography.Title>
                        <Typography.Text id='text_login'>Enter a new password for noreply@shopify.com</Typography.Text>
                        <Form.Item className='input-box' hasFeedback name='password' rules={[
                         {
                            required: true,
                            message:'Please input your Password'
                        },{
                            type:'password',
                            message:'The input is not valid Password'
                        }
                        ]}>
                        <Input size='large'  prefix={<LockOutlined className="site-form-item-icon" />}   placeholder='Enter your new password'/>
                        </Form.Item>
                        {error && (<Alert description={error} type='error' showIcon closable className='alert'/>)}
                        <Form.Item >
                        <Button id='btn_submit' type='primary' htmlType='submit'>Update</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Layout> 
        </>
    )
 }
 export default ResetPassword;