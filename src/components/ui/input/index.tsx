import { Form, Input } from "antd";

type Props = {
  name: string;
  placeholder: string;
  type?: string;
};

export const AppInput = ({ type = "text", name, placeholder }: Props) => {
  return (
    <Form.Item
      name={name}
      rules={[{ required: true, message: "Обов'язкове поле" }]}
      shouldUpdate={true}
    >
      <Input placeholder={placeholder} type={type} size="large" />
    </Form.Item>
  );
};
