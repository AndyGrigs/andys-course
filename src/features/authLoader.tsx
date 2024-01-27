import { Spin } from "antd";
import { useCurrentQuery } from "../redux/services/auth";

export const Auth = ({ children }: { children: JSX.Element }) => {
  const { isLoading } = useCurrentQuery();

  if (isLoading) {
    return <Spin />;
  }

  return children;
};
