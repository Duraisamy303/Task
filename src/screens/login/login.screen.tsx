import { Button, Checkbox, Form, Input, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { user_detail } from "../../utils/redux.utils";
import { useSelector } from "react-redux";
import Models from "../../imports/models.import";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSetState } from "../../utils/functions.util";

const Login = () => {
  const navigate = useNavigate();

  const [state, setState] = useSetState({
    loading: false,
  });

  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: any) => {
    try {
      setState({ loading: true });

      //   const body = {
      //     email: "eve.holt@reqres.in",
      //     password: "cityslicka",
      //   };

      const body = {
        email: values.email,
        password: values.password,
      };

      const res: any = await Models.auth.login(body);
      setState({ loading: false });

      localStorage.setItem("token", res?.token);
     
      navigate("/user_list");
      messageApi.open({
        type: "success",
        content: "Login succssfully",
      });
      user_detail(values);
    } catch (error: any) {
      setState({ loading: false });
      messageApi.open({
        type: "error",
        content: error,
      });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      {contextHolder}
      <div className="w-full max-w-lg bg-white p-8 rounded shadow">
        <Form
          name="loginForm"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              size="large"
            />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              size="large"
              loading={state.loading}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
