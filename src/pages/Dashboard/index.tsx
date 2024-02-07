import React from 'react';
import { Button, Card, List, Spin, Flex } from 'antd';
import { Outlet } from 'react-router-dom';
import { useGetAllModulesQuery } from '../../redux/services/modules';
import { useNavigate } from 'react-router-dom';



const Dashboard: React.FC = () => {
  const { data: modulesData, isLoading, isError } = useGetAllModulesQuery()
  const navigate = useNavigate();

  const handleStartClick = (moduleId: string) => {
    console.log('moduleId:', moduleId)
    navigate(`/module/${moduleId}/exercises`);
  };


  if (isLoading) {
    return (
      <Flex justify='center' align='center'>
        <Spin />;
      </Flex>)
  }

  if (isError) {
    return <div>Error loading modules.</div>;
  }


  return (
    // <Card title="Your Courses" bordered={false} style={{ width: '100%' }}>
    //   {modulesData && modulesData.map(item => <List key={item.id}>{item.name}</List>)}
    // </Card>

    <Card title="Твої модулі" bordered={false} style={{ width: '100%' }}>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 6,
          xxl: 3,
        }}
        dataSource={modulesData}
        renderItem={item => (
          <List.Item key={item._id}>
            <Card style={{ textAlign: "center" }} title={item.name}>
              <Flex justify='center' align='center' vertical gap={10}>
                <div>{item.exercises.length} вправ</div>
                <Button onClick={() => handleStartClick(item._id)} size='small'>Почати</Button>
              </Flex>
            </Card>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default Dashboard;