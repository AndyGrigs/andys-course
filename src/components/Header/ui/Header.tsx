import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Drawer, Button } from "antd";
import { MenuOutlined, FireFilled } from "@ant-design/icons";
import styles from "./Header.module.scss";
import { useTheme } from "antd-style";
import type { DrawerStyles } from "antd/es/drawer/DrawerPanel";
import { HeaderItems } from "./HeaderItems";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/slices/authSlice";
import ThemeToggle from '../../../app/theme/ThemeToggle';
import LanguageSelector from "../../LanguageSwitcher/LanguageSwitcher";

export const Header = () => {
  const user = useSelector(selectUser);
  const token = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const drawerStyles: DrawerStyles = {
    mask: { backdropFilter: "blur(8px)" },
    content: { boxShadow: "-10px 0 24px rgba(0,0,0,0.15)" },
    header: { borderBottom: `1px solid ${token.colorBorderSecondary}` },
    body: { padding: "16px 0" },
  };

  return (
    <Layout.Header className={styles.header}>

      <Link to="/" className={styles.logoLink}>
        <img
          className={styles.logo}
          src="https://cdn.pixabay.com/photo/2013/07/13/10/09/germany-156642_1280.png"
          alt="AndsKurs logo"
        />
        <span className={styles.brandName}>
          <span className={styles.brandAccent}>Andy</span><span className={styles.brandHighlight}>Kurs</span>
        </span>
      </Link>

      <div className={styles.controls}>
        {user && (
          <div className={styles.points}>
            <FireFilled className={styles.fireIcon} />
            <span className={styles.pointsValue}>{user.points}</span>
          </div>
        )}

        <ThemeToggle />
        <LanguageSelector />

        <Button
          className={styles.menuButton}
          icon={<MenuOutlined />}
          onClick={() => setIsOpen(true)}
          type="text"
          size="large"
        />
      </div>

      <Drawer
        title={
          user ? (
            <span className={styles.drawerTitle}>{user.fullName}</span>
          ) : (
            <span className={styles.drawerTitle}>Menu</span>
          )
        }
        placement="right"
        onClose={() => setIsOpen(false)}
        open={isOpen}
        styles={drawerStyles}
        width={280}
      >
        <HeaderItems />
      </Drawer>

    </Layout.Header>
  );
};
