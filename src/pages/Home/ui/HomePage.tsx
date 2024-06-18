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
    <section>
      <div className={styles.box}>
      {/* <div>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/ylh_iA_ReiE?si=ez0LlGwB08AvKDSY"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div> */}
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
  );
};

export default HomePage;
