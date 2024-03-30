import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Form, Card, Typography, Input, Button, Layout, Alert} from 'antd';
import { message } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import api from '../../../../api/axios'
import '/src/components/pages/Form/Forms.css';

function ForgotPassword(){ 
    const navigate = useNavigate(); 
    const [error, setErro] = useState();
    const handleSubmit =  async(values) => {
        const { email } = values;
        const {data} = await api.post('/forgot-password', {email});
        try {
            if(data.status === "success"){
                message.success('Check you email for reset password link')
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
                        <Typography.Title level={2} id='h2_login' strong>Forgot Password ?</Typography.Title>
                        <Typography.Text id='text_login'>Enter your email to rest your password.</Typography.Text>
                        <Form.Item className='input-box' name='email'hasFeedback rules={[
                        {
                            required: true,
                            message:'Please input your Email'
                        },{
                            type:'email',
                            message:'The input is not valid Email'
                        }
                        ]}>
                        <Input size='large'  prefix={<MailOutlined className="site-form-item-icon" />}   placeholder='Enter your email'/>
                        </Form.Item>
                        {error && (<Alert description={error} type='error' showIcon closable className='alert'/>)}
                        <Form.Item >
                        <Button id='btn_submit' type='primary' htmlType='submit'>Send</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Layout> 
        </>
    )
 }
 export default ForgotPassword;