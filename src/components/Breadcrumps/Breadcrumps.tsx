import { Breadcrumb } from "antd";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { selectCurrentModule } from "../../redux/slices/moduleSlice";
import style from './Breadcrumps.module.scss'
import { selectCurrentExercise } from '../../redux/slices/exerciseSlice';
import { useTheme } from "../../app/theme/ThemeContext";

export const Breadcrumbs = () => {
  const location = useLocation();
  const currentModule = useSelector(selectCurrentModule);
  const currentexercise = useSelector(selectCurrentExercise)
  const { theme } = useTheme();

  const breadView = () => {
    const { pathname } = location;
    const pathnames = pathname.split("/").filter((item) => item);
    return (
      <section className={style.text}>
        <Breadcrumb>
          {pathnames.length > 0 ? (
            <Breadcrumb.Item className={style.links} >
              <Link to="/">Home</Link>
            </Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          )}
          {pathnames.map((nam, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join(">")}`;
            const isLast = index === pathnames.length - 1;
            return isLast ? (
              <Breadcrumb.Item className={style.lastWord} key={index}>
                {
              
                nam === currentModule?._id? currentModule.name : nam === currentexercise?._id? "": nam}
                </Breadcrumb.Item>
            ) : (
              <Breadcrumb.Item className={style.links} key={index}>
                <Link style={{ textTransform: 'capitalize' }} className={style.links} to={`${routeTo}`}>{nam === currentModule?._id ? currentModule.name : nam}</Link>
              </Breadcrumb.Item>
            );
          })}
        </Breadcrumb>
      </section>
    );
  };
  return <>{breadView()}</>;
};
