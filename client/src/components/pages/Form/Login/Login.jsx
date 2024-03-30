import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Form, Card, Typography, Input, Button, Layout, Alert} from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { message } from 'antd';
import '/src/components/pages/Form/Forms.css';
import HeaderForms from '/src/components/HeaderForms/HeaderForms';
import api from '../../../../api/axios';

const Login = () =>{ 
    const navigate = useNavigate();
    const [error, setErro] = useState();
    const handleLogin =  async(values) => { 
        const {email, password} = values;
        try {
            const res = await api.post('/login', {email, password},{withCredentials: true});
            if(res.status === 200){
                window.localStorage.setItem("loggedIn", true);
                navigate('/profile');   
            } 
            api.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        } catch (err) {
            if(err.response.status === 400){
                setErro(err.response.data.message)
            }else if(err.response.status === 401){
                setErro(err.response.data.message)
            }else{
                message.error('Registatio failed')
            }
        }
    } 
    return(
        <>
            <HeaderForms/>
            <Layout className="form_container">
                <Card>
                    <Form layout='vertical ' onFinish={handleLogin}  className="form">
                        <Typography.Title level={2} id='h2_login' strong>Welcome back! &#128079;</Typography.Title>
                        <Typography.Text id='text_login'>Login with your account!</Typography.Text>
                        <Form.Item name='email' hasFeedback rules={[
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
                        <Form.Item name='password'hasFeedback rules={[
                        {
                            required: true,
                            message:'Please input your Password'
                        },{
                            type:'password',
                            message:'The input is not valid Password'
                        }
                        ]}>
                          <Input.Password size='large' prefix={<LockOutlined className="site-form-item-icon" />} placeholder='Enter your password'/>
                        </Form.Item>
                        <Form.Item className="forgot_box">
                          <Link to="/forgot-password" className="forgot">Forgot your password?</Link>
                        </Form.Item>
                        {error && (<Alert description={error} type='error' showIcon closable className='alert'/>)}
                        <Form.Item >
                          <Button 
                          type='primary'
                           //   type={`${loading ? '' : 'primary'}`} 
                          htmlType='submit'>
                            {/* {`${loading ? <Spin/>: 'Create Account'}`}  */}
                            Login Now
                          </Button>
                        </Form.Item>
                        <Form.Item className="login_signup">
                            Don t have an account?
                            <Link to="/register" >Signup</Link>
                        </Form.Item>
                    </Form>
                </Card>
            </Layout>
        </>
    )
 }
 export default Login;