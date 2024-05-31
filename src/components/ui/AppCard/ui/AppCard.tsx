import { Card } from "antd";
import { ReactNode, useContext } from "react";
import { ThemeContext } from "../../../../hooks/ThemeProvider";
import styles from './AppCard.module.scss'; 

// export const AppCard = () => {
//   const { theme } = useContext(ThemeContext);

//   return (
    // <div className={styles.box}> 
    //   <div className={styles.item}> 
    // <div className={styles.layer}></div>
    //     <div className={styles.title}>HTML mentor</div>
    //     <div className={styles.description}>
    //       Lorem ipsum dolor sit amet, consectetur 
    //     </div>
    //     <div className={styles.button}>About me</div>
    //   </div>
    // </div>
//   );
// };

interface AppCardProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonOnClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  children: ReactNode;
  // Additional props as needed
}

export const AppCard: React.FC<AppCardProps> = ({
  title = 'Default Title',
  description = 'Default Description',
  buttonText = 'Learn More',
  buttonOnClick,
  className,
  children,
}) => {


  // Determine the theme from context
  const { theme } = useContext(ThemeContext); // Adjust the import path as necessary

  return (
    // <div className={`app-card ${className}`}>
    //   <h2>{title}</h2>
    //   <p>{description}</p>
    //   <button onClick={buttonOnClick}>{buttonText}</button>
    //   {/* Render custom content */}
    //   {children}
    // </div>
    <div className={styles.box}> 
    <div className={styles.item}> 
  <div className={styles.layer}></div>
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>
        {description} 
      </div>
      <div onClick={buttonOnClick} className={styles.button}>{buttonText}</div>
    </div>
  </div>
  );
};