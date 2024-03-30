// import React from "react";
import {Link} from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Card, Typography, Input, Button, Layout, Alert} from 'antd';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { message } from 'antd';
import api from '../../../../api/axios';
import '/src/components/pages/Form/Forms.css';

function Signup(){
    const navigate = useNavigate();
    const [error, setErro] = useState();
    
    const handleLogin = async(values) => {
        const {name, email, password} = values;
        console.log(values)
        try {
            const res = await api.post('/signup',{name, email, password});
            console.log(res.status)
            if(res.status === 201){
                message.success(res.data.message)
            }else{
                message.error('Registatio failed')
            }
            navigate('/login'); 
        } catch (err) {
            if(err.response.status === 400){
                setErro(err.response.data.message)
            }
        }
    }
    return(
        <>  
            <Layout className="form_container">
                <Card >
                    <Form layout='vertical ' onFinish={handleLogin}  className="form">
                        <Typography.Title level={2} strong>Sign up</Typography.Title>
                        <Form.Item name='name' hasFeedback rules={[
                        {
                            required: true,
                            message:'Please input your Name'
                        },{
                            type:'text',
                            message:'The input is not valid name'
                        }
                        ]}>
                        <Input size='large' prefix={<UserOutlined className="site-form-item-icon" />}   placeholder='Enter your name'/>
                        </Form.Item>
                        <Form.Item name='email'hasFeedback rules={[
                        {
                            required: true,
                            message:'Please input your Email'
                        },{
                            type:'email',
                            message:'The input is not valid Email'
                        }
                        ]}>
                        <Input size='large' prefix={<MailOutlined className="site-form-item-icon" />} placeholder='Enter your email'/>
                        </Form.Item>
                        <Form.Item name='password' hasFeedback rules={[
                        {
                            required: true,
                            message:'Please input your Password!'
                        },{
                            type:'password',
                            // message:'The input is not valid Password'
                            validator: (_, value) => {
                                if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)) {  
                                  return Promise.resolve();
                                } else {
                                  return Promise.reject(new Error(
                                    `
                                     Minimum eight characters, 
                                     at least one uppercase letter, 
                                     one lowercase letter, 
                                     one number and one special character
                                    `
                                  ));
                                }
                            }
                        }
                        ]}>
                        <Input.Password size='large'  
                        prefix={<LockOutlined className="site-form-item-icon" />} 
                        placeholder='Enter your password'
                        />
                        </Form.Item>
                         {error && (<Alert description={error} type='error' showIcon closable className='alert'/>)}
                        <Form.Item >
                           <Button type='primary' htmlType='submit'>Signup Now</Button>
                        </Form.Item>
                        <Form.Item className="login_signup">
                           Already have an account?
                           <Link to="/login" >Login</Link>
                        </Form.Item>
                    </Form>
                </Card>
            </Layout> 
        </>
    )
}
export default Signup;
