import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.scss";
import { useTranslation } from 'react-i18next';
import {
  ReadOutlined,
  BookOutlined,
  EditOutlined,
  PlayCircleOutlined,
  TeamOutlined,
  AppstoreOutlined,
  TrophyOutlined,
} from '@ant-design/icons';

const BENEFIT_ICONS = [ReadOutlined, BookOutlined, EditOutlined, PlayCircleOutlined];

const STATS = [
  { icon: TeamOutlined, number: '500+', key: 'students' },
  { icon: AppstoreOutlined, number: '12', key: 'modules' },
  { icon: TrophyOutlined, number: '200+', key: 'exercises' },
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const benefitsList = t('homePage.benefits.list', { returnObjects: true }) as string[];

  return (
    <div className={styles.landingPage}>

      <section className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              <span className={styles.accentWord}>Andy</span><span className={styles.highlightWord}>Kurs</span>
            </h1>
            <p className={styles.heroDescription}>{t('homePage.heroDescription')}</p>
            <button onClick={() => navigate('/modules')} className={styles.ctaButton}>
              {t('homePage.startButton')}
            </button>
          </div>
        </div>
      </section>

      <section className={styles.statsSection}>
        <div className={styles.container}>
          <div className={styles.statsGrid}>
            {STATS.map(({ icon: Icon, number, key }) => (
              <div key={key} className={styles.statItem}>
                <Icon className={styles.statIcon} />
                <span className={styles.statNumber}>{number}</span>
                <span className={styles.statLabel}>{t(`homePage.stats.${key}`)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.videoSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>{t('homePage.videoIntroText')}</h2>
          <div className={styles.iframeWrapper}>
            <iframe
              src="https://www.youtube.com/embed/pNdD0egv67Y?si=VAWK4OeGPFG-ZfCs"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <section className={styles.benefitsSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>{t('homePage.benefits.title')}</h2>
          <div className={styles.benefitsGrid}>
            {benefitsList.map((item, index) => {
              const Icon = BENEFIT_ICONS[index] ?? ReadOutlined;
              return (
                <div key={index} className={styles.benefitCard}>
                  <div className={styles.benefitIconWrapper}>
                    <Icon className={styles.benefitIcon} />
                  </div>
                  <p className={styles.benefitText}>{item}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <h2 className={styles.ctaTitle}>{t('homePage.cta.title')}</h2>
          <p className={styles.ctaDescription}>{t('homePage.cta.description')}</p>
          <button onClick={() => navigate('/modules')} className={styles.ctaButtonAlt}>
            {t('homePage.cta.button')}
          </button>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerContent}>
            <span className={styles.footerBrand}>
              <span className={styles.accentWord}>Andy</span><span className={styles.highlightWord}>Kurs</span>
            </span>
            <nav className={styles.footerLinks}>
              <a href="#about">{t('homePage.footer.about')}</a>
              <a href="#contact">{t('homePage.footer.contact')}</a>
              <a href="#privacy">{t('homePage.footer.privacy')}</a>
            </nav>
          </div>
          <p className={styles.footerCopyright}>{t('homePage.footer.copyright')}</p>
        </div>
      </footer>

    </div>
  );
};

export default HomePage;
