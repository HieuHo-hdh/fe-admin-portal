import { Layout } from 'antd';
const { Footer: AntFooter } = Layout;

const Footer = () => {
  return (
    <>
      <AntFooter className='text-center'>
        CApp ©{new Date().getFullYear()}. All rights reserved.
      </AntFooter>
    </>
  );
};

export default Footer;
