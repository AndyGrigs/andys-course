import { useCurrentQuery } from "../redux/services/auth";
import { Loader } from "../components/Loader";

export const Auth = ({ children }: { children: JSX.Element }) => {
  const { isLoading } = useCurrentQuery();

  if (isLoading) {
    return <Loader />;
  }

  return children;
};
