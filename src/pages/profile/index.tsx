import { useEffect, useState } from 'react';
import './index.scss';
import api from '@/libs/api';
import { Avatar, Button, ConfigProvider, Tabs, message, Form, Input, Radio } from 'antd';
import type { TabsProps } from 'antd';
import { isMobileDevice } from '@/utils';
import { debounce } from 'lodash'
import { UserOutlined, RightOutlined } from '@ant-design/icons';

const Profile: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [isMobile, setIsMobile] = useState(() => {
    const _isMobile = isMobileDevice()
    document.documentElement.id = _isMobile ? 'mobile' : 'pc'
    return _isMobile
  });

  async function getApiData() {
    const { data } = await api.get('/api/data');
    const { message } = data;
    alert(`Message from api: ${message}`);
  }


  useEffect(() => {
    // 检测当前设备（示例项目，正常项目此功能应做在入口处，通过reducer实现）
    window.addEventListener('resize', debounce(() => {
      const _isMobile = isMobileDevice();
      setIsMobile(_isMobile);
      document.documentElement.id = _isMobile ? 'mobile' : 'pc';
    }, 100));
  }, [])


  // 头部块
  const header = () => {
    return <header className='header'>
      <h4>
        <Avatar className='avatar' size="large" icon={<UserOutlined />} />
        <i>用户4asdas123</i>
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
    const formItemLayout = {

    };
    const onFinish = (values: any) => {
      console.log('Received values of form: ', values);
    };
    return (
      <Form
        // disabled
        labelCol={{
          xs: { span: 24 },
          sm: { span: 8 },
        }}
        wrapperCol={{
          xs: { span: 24 },
          sm: { span: 16 },
        }}
        form={form}
        name="basic"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        scrollToFirstError
      >
        <Form.Item
          name="username"
          label="用户名"
          rules={[
            {
              required: true,
              message: '请输入用户名',
            },
          ]}
        >
          <Input placeholder="请输入用户名" />
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
              required: true,
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
          <Radio.Group value={1}>
            <Radio value={1}>男</Radio>
            <Radio value={2}>女</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="nickname"
          label="别名"
          tooltip="你的艺名"
          rules={[{ whitespace: true }]}
        >
          <Input placeholder="请输入别名" />
        </Form.Item>
        <Form.Item
          name="introduction"
          label="自我介绍"
        >
          <Input.TextArea placeholder="自我介绍" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }

  //安全中心
  const securityCenter = () => {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const onFinish = (values: any) => {
      console.log('Received values of form: ', values);
    };
    return (
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{ residence: ['zhejiang', 'hangzhou', 'xihu'], prefix: '86' }}
        style={{ maxWidth: 600 }}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The new password that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="nickname"
          label="Nickname"
          tooltip="What do you want others to call you?"
          rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
        >
          <Input />
        </Form.Item>

        {/* <Form.Item
          name="residence"
          label="Habitual Residence"
          rules={[
            { type: 'array', required: true, message: 'Please select your habitual residence!' },
          ]}
        >
          <Cascader options={residences} />
        </Form.Item>
  
        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[{ required: true, message: 'Please input your phone number!' }]}
        >
          <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
        </Form.Item>
  
        <Form.Item
          name="donation"
          label="Donation"
          rules={[{ required: true, message: 'Please input donation amount!' }]}
        >
          <InputNumber addonAfter={suffixSelector} style={{ width: '100%' }} />
        </Form.Item>
  
        <Form.Item
          name="website"
          label="Website"
          rules={[{ required: true, message: 'Please input website!' }]}
        >
          <AutoComplete options={websiteOptions} onChange={onWebsiteChange} placeholder="website">
            <Input />
          </AutoComplete>
        </Form.Item>
  
        <Form.Item
          name="intro"
          label="Intro"
          rules={[{ required: true, message: 'Please input Intro' }]}
        >
          <Input.TextArea showCount maxLength={100} />
        </Form.Item>
  
        <Form.Item
          name="gender"
          label="Gender"
          rules={[{ required: true, message: 'Please select gender!' }]}
        >
          <Select placeholder="select your gender">
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>
  
        <Form.Item label="Captcha" extra="We must make sure that your are a human.">
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                name="captcha"
                noStyle
                rules={[{ required: true, message: 'Please input the captcha you got!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Button>Get captcha</Button>
            </Col>
          </Row>
        </Form.Item>
  
        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            I have read the <a href="">agreement</a>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item> */}
      </Form>
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

  const onChange = (key: string) => {
    console.log(key);
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

      <div className='profile'>
        {header()}
        <Tabs className='tabs' defaultActiveKey="1" items={items} onChange={onChange} />
        {/* <div className='test'>{isMobile ? "mobile" : 'PC'}</div> */}
      </div>
    </ConfigProvider>
  );
}

export default Profile;
