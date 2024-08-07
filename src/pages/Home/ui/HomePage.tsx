import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.scss";
import { useTranslation } from 'react-i18next';


//  const { Title, Paragraph } = Typography;

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation()
  const start = () => {
    navigate("/modules");
  };

  const benefitsList = t('homePage.benefits.list', { returnObjects: true }) as string[];

  return (
    <div className={styles.landingPage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <h1>{t('homePage.heroTitle')}</h1> {/* Use t() function for translation */}
        <p>{t('homePage.heroDescription')}</p>
        <button onClick={() => start()} className={styles.ctaButton}>
          {t('homePage.startButton')}
        </button>
      </section>

      {/* Introduction */}
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

      {/* Course Benefits */}
      <section className={styles.benefitsSection}>
        <h2>{t('homePage.benefits.title')}</h2>
        <ul>
        {benefitsList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      </section>

      {/* Testimonials */}
      {/* <section className={styles.testimonialsSection}>
        <h2>Що говорять студенти?</h2>
        <div className={styles.testimonials}>
          <div className={styles.testimonial}>
            <p>
              "Виконуючи цей курс, я завоїв матеріал практично до автоматизму"
            </p>
          </div>
          <div className={styles.testimonial}>
            <p>"Потрібно працювати, але результат помітний."</p>
          </div>
        </div>
      </section> */}

      {/* <section className={styles.detailsSection}>
        <h2>Переваги курсу</h2>
        <ul>
          <li>Ексклюзивні ресурси</li>
          <li>Практичні поради</li>
          <li>Індивідуальний відгук</li>
        </ul>
      </section> */}

      {/* Enrollment Section */}
      <section className={styles.enrollmentSection}>
        <h2>Готові почати? Реєструйтесь зараз!</h2>
        <p></p>
        <button className={styles.ctaButton}>Реєструйтесь!</button>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerLinks}>
          <a href="#about">About Us</a>
          <a href="#contact">Contact</a>
          <a href="#privacy">Privacy Policy</a>
        </div>
        <div className={styles.socialMedia}>
          <a href="#facebook">Facebook</a>
          <a href="#twitter">Twitter</a>
          <a href="#linkedin">LinkedIn</a>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;


