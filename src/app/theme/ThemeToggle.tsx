// src/components/ThemeToggle.tsx
import React from 'react';
import { useTheme } from './ThemeContext';
import { Button } from 'antd';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      type="text"
      onClick={toggleTheme}
      icon={theme === "dark" ? <SunOutlined /> : <MoonOutlined />}
    />


  );
};

export default ThemeToggle;

