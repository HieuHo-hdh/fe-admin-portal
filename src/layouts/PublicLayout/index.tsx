import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <div className='flex items-center justify-center w-full min-h-screen bg-primary-100'>
      <Outlet />
    </div>
  );
};

export default PublicLayout;
