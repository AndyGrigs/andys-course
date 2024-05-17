import React from 'react';
import { Layout, Typography} from 'antd';
import { Link } from 'react-router-dom';
const { Content } = Layout;
const { Title, Paragraph } = Typography;

const HomePage: React.FC = () => {
  return (
    <Content style={{ padding: '0 50px', marginTop: 64 }}>
      <div style={{ padding: 24,  minHeight: 380, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        
          <Title level={2}>Вивчай німецьку легко та ефективно!</Title>
          <Paragraph>
            Мій курс допоможе вам швидко освоїти німецьку мову. 
          </Paragraph >

          <Link to='/modules'>
            Почати!
          </Link>
  
      </div>
    </Content>  
  );
};

export default HomePage;
