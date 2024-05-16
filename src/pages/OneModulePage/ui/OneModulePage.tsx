// Import necessary hooks and components at the top of OneModulePage.tsx
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentModule } from '../../../redux/slices/moduleSlice';
import { ThemeContext } from '../../../hooks/ThemeProvider';
import { Button, Card, List } from 'antd';

const OneModulePage: React.FC = () => {
  const currentModule = useSelector(selectCurrentModule);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  
  

  return (
    <Card
    className={theme === "dark" ? "card-dark" : "card-light"}
    title="Твої модулі"
    bordered={false}
    style={{ width: "100%" }}
  >
              <Card
            style={theme === "dark" ? { background: "#5a7cbb" } : {}}
            title={currentModule?.name}
          >
            <List
              size="small"
              dataSource={[
                //   { title: "Videos", link: `/modules/${module._id.$oid}/videos` },
                {
                  title: "Text Content",
                  link: `/modules/${currentModule?._id}/text`,
                },
                {
                  title: "Vocabulary",
                  link: `/modules/${currentModule?._id}/vocabulary`,
                },
                {
                  title: "Exercises",
                  link: `/modules/${currentModule?._id}/exercises`,
                },
              ]}
              renderItem={(item) => (
                <List.Item>
                  <Button
                    onClick={() => {
                      navigate(item.link);
                    }}
                    type="text"
                  >
                    {item.title}
                  </Button>
                </List.Item>
              )}
            />
          </Card>
  </Card>
  );
};

export default OneModulePage;