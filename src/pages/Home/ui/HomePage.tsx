import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.scss";

//  const { Title, Paragraph } = Typography;

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const start = () => {
    navigate("/modules");
  };
  return (
    <div className={styles.landingPage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <h1>Вичай німецьку ефективно!</h1>
        <p>
          Мій курс допоможе тобі засвоїти граиатику та розширити словниковий
          запас
        </p>
        <button onClick={() => start()} className={styles.ctaButton}>
          Починаємо!
        </button>
      </section>

      {/* Introduction */}
      <section className={styles.introductionSection}>
        <h2>Вступ</h2>
        <p>Тут подивись відео про цей курс</p>
        <iframe
          // width="460"
          // height="215"
          src="https://www.youtube.com/embed/ylh_iA_ReiE?si=ez0LlGwB08AvKDSY"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </section>

      {/* Course Benefits */}
      <section className={styles.benefitsSection}>
        <h2>Що тебе чекає?</h2>
        <ul>
          <li>Тексти </li>
          <li>Словникові вправи </li>
          <li>Тренажер граматики</li>
          <li>Відеопояснення до кожної вправи</li>
        </ul>
      </section>

      {/* Testimonials */}
      <section className={styles.testimonialsSection}>
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
      </section>

      {/* Course Details 
      <section className={styles.detailsSection}>
        <h2>Course Highlights and Benefits</h2>
        <p>
          Gain access to exclusive resources, hands-on projects, and
          personalized feedback from our experienced instructors. Everything you
          need to succeed.
        </p>
        <ul>
          <li>Exclusive resources</li>
          <li>Hands-on projects</li>
          <li>Personalized feedback</li>
        </ul>
      </section>

      */}
      <section className={styles.detailsSection}>
        <h2>Переваги курсу</h2>
        <ul>
          <li>Ексклюзивні ресурси</li>
          <li>Практичні поради</li>
          <li>Індивідуальний відгук</li>
        </ul>
      </section>

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
        <div className={styles.newsletter}>
          <h3>Subscribe to our Newsletter</h3>
          <input type="email" placeholder="Enter your email" />
          <button>Subscribe</button>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;

/**
 *   <section>
      <div className={styles.box}>
      <div>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/ylh_iA_ReiE?si=ez0LlGwB08AvKDSY"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div> 
        <div className={styles.item}>
          <div className={styles.layer}></div>
          <div className={styles.title}>
            Вивчай німецьку легко та ефективно!
          </div>
          <div className={styles.description}>
            Мій курс допоможе вам швидко освоїти німецьку мову.
          </div>
          <div onClick={() => start()} className={styles.button}>
            Start!
          </div>
        </div>
      </div>
    </section>
 */
