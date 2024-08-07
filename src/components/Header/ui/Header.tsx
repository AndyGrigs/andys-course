import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Space, Typography, Button, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import styles from "./Header.module.scss";
import { useTheme } from "antd-style";
import type {
  DrawerStyles,
} from "antd/es/drawer/DrawerPanel";
import { HeaderItems } from "./HeaderItems";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/slices/authSlice";
import ThemeToggle from '../../../app/theme/ThemeToggle';
import LanguageSelector from "../../LanguageSwitcher/LanguageSwitcher";


export const Header = () => {
  const user = useSelector(selectUser);
  // const { theme } = useTheme();

  // const useStyle = createStyles(() => ({
  //   "my-drawer-mask": {
  //     boxShadow: `inset 0 0 15px #fff`,
  //   },
  //   "drawer-header-light": {
  //     background: "green",
  //   },
  //   "drawer-header-dark": {
  //     background: "green",
  //   },
  //   "my-drawer-footer": {},
  //   "my-drawer-content": {
  //     borderLeft: "2px solid #333",
  //   },
  //   "drawer-body-dark": {
  //     // color: "#fff",
  //     backgroundColor: "#5585b5",
  //   },
  //   "drawer-body-light": {
  //     backgroundColor:
  //       "radial-gradient(circle at 0% 0.5%, rgb(241, 241, 242) 0.1%, rgb(224, 226, 228) 100.2%)",
  //   },
  // }));

  const Menu = () => {
    // const { styles } = useStyle();
    const token = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = () => {
      setIsOpen(!isOpen);
    };

    // const classNames: DrawerClassNames = {
    //   body:
    //     theme === "dark"
    //       ? styles["drawer-body-dark"]
    //       : styles["drawer-body-light"],
    //   mask: styles["my-drawer-mask"],
    //   header:
    //     theme === "dark"
    //       ? styles["drawer-body-dark"]
    //       : styles["drawer-body-light"],
    //   footer: styles["my-drawer-footer"],
    //   content: styles["my-drawer-content"],
    // };

    const drawerStyles: DrawerStyles = {
      mask: {
        backdropFilter: "blur(10px)",
      },
      content: {
        boxShadow: "-10px 0 10px #666",
      },
      header: {
        borderBottom: `1px solid ${token.colorPrimary}`,
      },
      body: {
        fontSize: token.fontSizeLG,
      },
      footer: {
        borderTop: `1px solid ${token.colorBorder}`,
      },
    };

    return (
      <>
        <Space>
          <Button
            icon={<MenuOutlined />}
            onClick={toggleDrawer}
            type="text"
            style={{ marginBottom: 16 }}
          />
        </Space>

        <Drawer
          title={user ? user.fullName : ""}
          placement="right"
          // footer="Footer"
          onClose={toggleDrawer}
          open={isOpen}
          //  classNames={classNames}
          styles={drawerStyles}
        >
          {/* {user ? (
            <Flex vertical align="center">
              <Link to="/dashboard">
                <Button icon={<BookOutlined />} type="text">
                  Кабінет
                </Button>
              </Link>
              <Button
                icon={<LogoutOutlined />}
                onClick={onLogoutClick}
                type="text"
              >
                Вийти
              </Button>
            </Flex>
          ) : (
            <Space>
              <Link to="/login">
                <Button icon={<LoginOutlined />} type="text">
                  Увійти
                </Button>
              </Link>
              <Link to="/register">
                <Button icon={<UserAddOutlined />} type="text">
                  Зареєструватись
                </Button>
              </Link>
            </Space>
          )} */}
          <HeaderItems />
        </Drawer>
      </>
    );
  };

  return (
    <Layout.Header className={styles.header}
    >
      <Link to="/">
        <Space>
          <Typography.Title level={4}>
            <img className={styles.logo} src="https://cdn.pixabay.com/photo/2013/07/13/10/09/germany-156642_1280.png" />
          </Typography.Title>
        </Space>
      </Link>

      <div className={styles.links}>
        <Space>
          <Typography.Paragraph>
            🔥{user ? user.points : ""}
          </Typography.Paragraph>
        </Space>
        <ThemeToggle />
        <LanguageSelector/>
        <Menu />
      </div>
    
    </Layout.Header>
  );
};
