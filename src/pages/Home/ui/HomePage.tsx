import React from 'react';
import { Layout, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import styles from './HomePage.module.scss';
import { AppCard } from '../../../components/ui/AppCard/ui/AppCard';
 const { Title, Paragraph } = Typography;

const HomePage: React.FC = () => {

  const navigate = useNavigate();

  const start = () => {
    navigate('/modules');
  };
  return (
  
       <div className='box' > 

        <Title level={2}>Вивчай німецьку легко та ефективно!</Title>
        <Paragraph>
          Мій курс допоможе вам швидко освоїти німецьку мову.
        </Paragraph >

         <Link to='/modules'  className={styles.linkButton}>
            Почати!
          </Link>  

        {/* <AppCard
          title="Вивчай німецьку легко та ефективно!"
          description=" Мій курс допоможе вам швидко освоїти німецьку мову."
          buttonText="Start"
          buttonOnClick={() => start()}
        >

        </AppCard> */}

       </div> 
 
  );
};

export default HomePage;
