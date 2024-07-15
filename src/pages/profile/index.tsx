import { useState } from 'react';
import './index.scss';
import api from '@/libs/api';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

const Profile: React.FC = () => {
  const [count, setCount] = useState(0);

  async function getApiData() {
    const { data } = await api.get('/api/data');
    const { message } = data;
    alert(`Message from api: ${message}`);
  }

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Tab 1',
      children: <div className='test'>asd</div>,
    },
    {
      key: '2',
      label: 'Tab 2',
      children: 'Content of Tab Pane 2',
    },
    {
      key: '3',
      label: 'Tab 3',
      children: 'Content of Tab Pane 3',
    },
  ];

  const onChange = (key: string) => {
    console.log(key);
  };

  return (
    <>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </>
  );
}

export default Profile;
