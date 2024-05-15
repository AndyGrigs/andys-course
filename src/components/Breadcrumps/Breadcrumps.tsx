import { Breadcrumb } from "antd";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { selectCurrentModule } from "../../redux/slices/moduleSlice";
import { toNamespacedPath } from "path/posix";

export const Breadcrumbs = () => {
  const location = useLocation();
  const currentModule = useSelector(selectCurrentModule);
  const breadView = () => {
    const { pathname } = location;
    const pathnames = pathname.split("/").filter((item) => item);
    return (
      <div>
        <Breadcrumb>
          {pathnames.length > 0 ? (
            <Breadcrumb.Item>
              <Link to="/">Home</Link>
            </Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          )}
          {pathnames.map((nam, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;
            return isLast ? (
              <Breadcrumb.Item  key={index}>{nam}</Breadcrumb.Item>
            ) : (
              <Breadcrumb.Item key={index}>
                <Link style={{textTransform: 'capitalize'}} to={`${routeTo}`}>{nam === currentModule?._id ? currentModule.name: nam}</Link>
              </Breadcrumb.Item>
            );
          })}
        </Breadcrumb>
      </div>
    );
  };
  return <>{breadView()}</>;
};
