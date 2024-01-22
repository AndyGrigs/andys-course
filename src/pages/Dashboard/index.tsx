import React from 'react';
import { Card, Progress } from 'antd';

const coursesData = [
  { title: 'Introduction to Programming', progress: 75 },
  { title: 'Advanced Web Development', progress: 50 },
  { title: 'Data Structures and Algorithms', progress: 30 },
  // Add more courses as needed
];

const Dashboard: React.FC = () => {
  return (
    <Card title="Your Courses" bordered={false} style={{ width: '100%' }}>
      {coursesData.map((course, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <h3>{course.title}</h3>
          <Progress percent={course.progress} />
          {/* Additional course details can be added here */}
        </div>
      ))}
    </Card>
  );
};

export default Dashboard;
