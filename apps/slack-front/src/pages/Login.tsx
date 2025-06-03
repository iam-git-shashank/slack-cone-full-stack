import { useLogin } from "@refinedev/core";
import { Form, Input, Button, Card } from "antd";

export const Login = () => {
  const { mutate: login } = useLogin();

  const onFinish = (values: { email: String; password: String }) => {
    login(values);
  };

  return (
    <Card
      title="Login"
      style={{ maxWidth: 400, margin: "auto", marginTop: 100 }}
    >
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="Email" name="email" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
