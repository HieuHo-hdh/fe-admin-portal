import { FC, useCallback, useEffect } from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { authActions } from '@/redux/actions/authAction';
import { LOGIN_SUCCESS } from '@/constants/messages.constants';

const { Title, Text } = Typography;

interface LoginFormValues {
  username: string;
  password: string;
}

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const { loading, error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  const onFinish = useCallback(async (values: LoginFormValues) => {
    try {
      await dispatch(authActions.login(values)).unwrap();
      message.success(LOGIN_SUCCESS);
      navigate('/');
    } catch {
      // Error is handled by the auth slice and displayed via useEffect
    }
  }, [dispatch, navigate]);

  return (
    <div className='w-full max-w-xs px-4'>
      <Card className='shadow-lg'>
        <div className='text-center mb-6'>
          <Title level={2} className='mb-2'>
            Welcome Back
          </Title>
          <Text className='text-gray-500'>Please sign in to continue</Text>
        </div>

        <Form
          form={form}
          name='login'
          onFinish={onFinish}
          layout='vertical'
          requiredMark={false}
          size='large'
          className='space-y-4'
        >
          <Form.Item
            name='username'
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input
              prefix={<UserOutlined className='text-gray-400' />}
              placeholder='Username'
              autoComplete='username'
            />
          </Form.Item>

          <Form.Item
            name='password'
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 6, message: 'Password must be at least 6 characters!' },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className='text-gray-400' />}
              placeholder='Password'
              autoComplete='current-password'
            />
          </Form.Item>

          <div className='space-y-3'>
            <Button type='primary' htmlType='submit' className='w-full h-10' loading={loading}>
              Sign In
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
