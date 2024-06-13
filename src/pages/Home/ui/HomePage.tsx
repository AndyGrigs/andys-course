import React from 'react';
import { Layout, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import styles from './HomePage.module.scss';
import { AppCard } from '../../../components/ui/AppCard/ui/AppCard';
//  const { Title, Paragraph } = Typography;

const HomePage: React.FC = () => {

  const navigate = useNavigate();

  const start = () => {
    navigate('/modules');
  };
  return (
  
    <section>
    <div className={styles.box}>
      <div className={styles.item}>
        <div className={styles.layer}></div>
        <div className={styles.title}>Вивчай німецьку легко та ефективно!</div>
        <div className={styles.description}>
          Мій курс допоможе вам швидко освоїти німецьку мову.
        </div>
        <div onClick={() => start()} className={styles.button}>Start!</div>
      </div>
    </div>
    <iframe
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
  </section>
  );
};

export default HomePage;
