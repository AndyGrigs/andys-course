import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.scss";
import { useTranslation } from 'react-i18next';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const start = () => {
    navigate("/modules");
  };

  const benefitsList = t('homePage.benefits.list', { returnObjects: true }) as string[];

  return (
    <div className={styles.landingPage}>
      <section className={styles.heroSection}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            <span className={styles.language}>Language</span>{' '}
            <span className={styles.school}>School</span>
          </h1>
          <p className={styles.description}>{t('homePage.heroDescription')}</p>
          <button onClick={start} className={styles.ctaButton}>
            Let's Start
          </button>
        </div>
      </section>

      <section className={styles.introductionSection}>
      <h2>{t("homePage.videoIntroText")}</h2>
        <div className={styles.iframeContainer}>
          <iframe
            width="80%"
            height="250"
            src="https://www.youtube.com/embed/pNdD0egv67Y?si=VAWK4OeGPFG-ZfCs"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      <section className={styles.benefitsSection}>
        <h2>{t('homePage.benefits.title')}</h2>
        <ul>
          {benefitsList.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerLinks}>
          <a href="#about">About Us</a>
          <a href="#contact">Contact</a>
          <a href="#privacy">Privacy Policy</a>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;

{/* 
      

*/}