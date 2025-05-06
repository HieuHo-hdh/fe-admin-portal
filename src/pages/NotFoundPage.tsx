import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LOCAL_STORAGE_KEY } from '@/constants/localStorage.constants';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);

  const handleBackClick = () => {
    if (isAuthenticated) {
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  return (
    <Result
      status='404'
      title='404'
      subTitle='Sorry, the page you visited does not exist.'
      extra={
        <Button type='primary' onClick={handleBackClick}>
          {isAuthenticated ? 'Back Home' : 'Back to Login'}
        </Button>
      }
    />
  );
};

export default NotFoundPage;
