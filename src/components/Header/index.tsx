import { Link } from "react-router-dom";
import { Layout, Space, Typography, Button } from "antd";
import { LoginOutlined, UserAddOutlined } from "@ant-design/icons";
import style from "./Header.module.scss";

export const Header = () => {
  return (
    <Layout.Header className={style.header}>
      <Link to="/">
        <Space>
          <Typography.Title level={4}>Lernsr du Deutsch?</Typography.Title>
        </Space>
      </Link>
      <div>
        <Space>
          <Link to="/login">
            <Button icon={<LoginOutlined />} type="text">
              Login
            </Button>
          </Link>
        </Space>
        <Space>
          <Link to="/register">
            <Button icon={<UserAddOutlined />} type="text">
              Register
            </Button>
          </Link>
        </Space>
      </div>
    </Layout.Header>
  );
};

// import styles from "./Header.module.scss";
// import Container from "@mui/material/Container";
// import Button from "@mui/material/Button";

// interface HeaderProps {
//   isAuth?: boolean;
// }

// export const Header: React.FC<HeaderProps> = () => {
//   const isAuth: boolean = false;
//   const onClickLogout = (): void => {};
//   return (
//     <div className={styles.root}>
//       <Container maxWidth="lg">
//         <div className={styles.inner}>
//           <Link className={styles.logo} to="/">
//             <div>LERNST DU DEUTCH?</div>
//           </Link>
//           <div className={styles.buttons}>
//             {isAuth ? (
//               <>
//                 <Link to="/dashboard">
//                   <Button variant="contained">Твій прогрес</Button>
//                 </Link>
//                 <Button
//                   onClick={onClickLogout}
//                   variant="contained"
//                   color="error"
//                 >
//                   Вийти
//                 </Button>
//               </>
//             ) : (
//               <>
//                 <Link to="/login">
//                   <Button variant="outlined">Війти</Button>
//                 </Link>
//                 <Link to="/register">
//                   <Button variant="contained">Створити аккаунт</Button>
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>
//       </Container>
//     </div>
//   );
// };
