import { useEffect, useState } from 'react';
import './profile.scss';
import { Avatar, Button, ConfigProvider, Tabs, message, Form, Input, Radio, Spin } from 'antd';
import type { TabsProps } from 'antd';
import { isMobileDevice } from '@/utils';
import { debounce, isEqual } from 'lodash'
import { UserOutlined, RightOutlined } from '@ant-design/icons';
import { apiGetUserInfo, apiUpdateUserInfo, UserInfo } from '@/api/userInfo';



const Profile: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [isLoading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({} as UserInfo);
  const [isEditMode, setEditMode] = useState(false);
  const [isMobile, setMobile] = useState(() => {
    const _isMobile = isMobileDevice()
    document.documentElement.id = _isMobile ? 'mobile' : 'pc'
    return _isMobile
  });

  // 获取用户信息
  const getUserInfo = async () => {
    const info = await apiGetUserInfo();
    setUserInfo(info.data);
    form.setFieldsValue(info.data);
    setLoading(false)
  }


  useEffect(() => {
    getUserInfo();
    // 检测当前设备（示例项目，正常项目此功能应做在入口处，通过redux管理）
    window.addEventListener('resize', debounce(() => {
      console.log("切换组件用", isMobile)
      const _isMobile = isMobileDevice();
      setMobile(_isMobile);
      document.documentElement.id = _isMobile ? 'mobile' : 'pc';
    }, 100));
  }, [])


  //取消编辑
  const cancleEdit = () => {
    setEditMode(false);
    form.setFieldsValue(userInfo);
  }


  // 头部块
  const header = () => {
    return <header className='header'>
      <h4>
        <Avatar className='avatar' size="large" icon={<UserOutlined />} />
        <i>用户 {userInfo.username}</i>
      </h4>
      <div className='vipbox' onClick={() => {
        messageApi.open({
          type: 'warning',
          content: 'demo展示',
        })
      }}>
        <p>黄金VIP会员<RightOutlined /></p>
      </div>
      {/* <Avatar className='avatar' src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" /> */}
    </header>
  }


  //基本信息
  const basicInformation = () => {
    const onFinish = async (values: UserInfo) => {
      if (isEqual(values, userInfo)) {
        messageApi.open({
          type: 'warning',
          content: '没有任何改动',
        })
        return;
      }
      setLoading(true)
      setUserInfo(values);
      setEditMode(false);
      const data = await apiUpdateUserInfo(values);
      setLoading(false)
      if (data.code === 200) {
        messageApi.open({
          type: 'success',
          content: '修改成功',
        })
      } else {
        messageApi.open({
          type: 'error',
          content: '修改失败，请重试',
        })
      }
    };
    return (
      <Form
        disabled={!isEditMode}
        form={form}
        name="basic"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        scrollToFirstError
        labelCol={{
          sm: { span: 6 },
        }}
        wrapperCol={{
          sm: { span: 20 },
        }}
        labelAlign={'left'}
      >
        <Form.Item
          name="username"
          label="用户名"
          rules={[
            {
              pattern: /^[a-zA-Z][a-zA-Z0-9_]{3,12}$/,
              required: isEditMode,
              message: '请输入正确用户名（以一个字母开头后面跟着3到12个由字母、‌数字或下划线组成的字符）',
            },
          ]}
        >
          <Input placeholder={"请输入用户名"} />
        </Form.Item>
        <Form.Item
          name="age"
          label="年龄"
          rules={[
            {
              message: '请输入年龄',
              required: isEditMode,
            },
            () => ({
              validator(_, value) {
                if (value < 100 && !/\./.test(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('请输入正确的年龄'));
              },
            }),
          ]}
        >
          <Input type='number' />
        </Form.Item>
        <Form.Item
          name="email"
          label="邮箱"
          rules={[
            {
              type: 'email',
              message: '请检查邮箱格式',
            },
            {
              required: isEditMode,
              message: '请输入邮箱地址',
            },
          ]}
        >
          <Input placeholder="请输入邮箱地址" />
        </Form.Item>
        <Form.Item
          name="sex"
          label="性别"
        >
          {/* <Radio.Group onChange={onChange} value={value}> */}
          <Radio.Group value={"1"}>
            <Radio value={"1"}>男</Radio>
            <Radio value={"2"}>女</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="nickname"
          label="别名"
          tooltip="你的艺名"
          rules={[{ whitespace: true, len: 15, message: '请输入别名(15位以内)' }]}
        >
          <Input placeholder="请输入别名(15位以内)" />
        </Form.Item>
        <Form.Item
          name="introduction"
          label="自我介绍"
          rules={[{ whitespace: true, max: 200, message: '请输入自我介绍(200字以内)' }]}
        >
          <Input.TextArea placeholder="请输入自我介绍(200字以内)" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          {isEditMode ?
            <div className='form-btn'>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
              <Button type="primary" htmlType="button" onClick={cancleEdit}>
                取消
              </Button>
            </div>
            :
            <Button disabled={isEditMode} type="primary" htmlType="button" onClick={setEditMode.bind(this, true)}>
              编辑
            </Button>
          }
        </Form.Item>
      </Form>
    );
  }

  //安全中心
  const securityCenter = () => {
    return (
      <>
        <p>
          此项目为面试demo版本，很多内容很多内容因为demo功能较简单和时间原因没有用，比如：api，components,utils,DB等更完善的抽象，
          各种类型的定义，状态码，以及动效，主题色，国际化，SSR，SSG，PWA等各种优化。
        </p>
        <p>
          平台基座项目做的很好，很感兴趣，希望有机会能加入团队，祝好。
        </p>
      </>
    );
  }

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '基本信息',
      children: basicInformation(),
    },
    {
      key: '2',
      label: '安全中心',
      children: securityCenter(),
    },
  ];

  const onChange = () => {
    setEditMode(false);
  };
  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            inkBarColor: "#00cc4c",
            itemHoverColor: "#00cc4c",
            itemSelectedColor: "#00cc4c",
          },
        },
      }}
    >
      {contextHolder}
      <Spin tip="Loading..." delay={30} spinning={isLoading}>
        <div className='profile'>
          {header()}
          <Tabs className='tabs' defaultActiveKey="1" items={items} onChange={onChange} />
          {/* <div className='test'>{isMobile ? "mobile" : 'PC'}</div> */}
        </div>
      </Spin>
    </ConfigProvider>
  );
}

export default Profile;
