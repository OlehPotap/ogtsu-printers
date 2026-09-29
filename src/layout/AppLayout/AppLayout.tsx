import type { PropsWithChildren } from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

import { Flex } from 'antd';

type AppLayoutProps = PropsWithChildren;

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <>
      <Header />
      <Flex>
        <Sidebar />

        <main className='app__content'>{children}</main>
      </Flex>
    </>
  );
};

export default AppLayout;
