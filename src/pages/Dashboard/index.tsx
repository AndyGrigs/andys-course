import React from 'react';
import { Card, List, Spin } from 'antd';
import { useGetAllModulesQuery } from '../../redux/services/modules';



const Dashboard: React.FC = () => {
  const { data: modulesData, isLoading, isError } = useGetAllModulesQuery()
  console.log(modulesData)

  if (isLoading) {
    return <Spin />;
  }

  if (isError) {
    return <div>Error loading modules.</div>;
  }


  return (
    <Card title="Your Courses" bordered={false} style={{ width: '100%' }}>
      {modulesData && modulesData.map(item => <List key={item.id}>{item.name}</List>)}
    </Card>
  );
};

export default Dashboard;