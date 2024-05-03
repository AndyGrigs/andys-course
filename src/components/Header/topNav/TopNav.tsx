import React, { useState } from "react";
import styles from "./TopNav.module.scss";

const TopNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <section className={styles.topNav}>
      <div>Logo Here</div>
      <input
        id="menu-toggle"
        type="checkbox"
        checked={isOpen}
        onChange={toggleMenu}
        className={styles.menuToggle}
      />
      <label className={styles.menuButtonContainer} htmlFor="menu-toggle">
        <div className={styles.menuButton}></div>
      </label>
      <ul className={isOpen ? `${styles.menu} ${styles.open}` : styles.menu}>
        <li>One</li>
        <li>Two</li>
        <li>Three</li>
        <li>Four</li>
        <li>Five</li>
      </ul>
    </section>
  );
};

export default TopNav;
