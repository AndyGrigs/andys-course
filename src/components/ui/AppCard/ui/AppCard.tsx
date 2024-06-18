
import { ReactNode } from "react";
import styles from './AppCard.module.scss';



interface AppCardProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonOnClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;


}

export const AppCard: React.FC<AppCardProps> = ({
  title = 'Default Title',
  description = 'Default Description',
  buttonText = 'Learn More',
  buttonOnClick,
  children,

}) => {


  

  return (
    <div className={styles.box}>
      <div className={styles.item}>
        <div className={styles.layer}></div>
        <p>
          {children}
        </p>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>
          {description}
        </div>
        <div onClick={buttonOnClick} className={styles.button}>{buttonText}</div>
      </div>
    </div>
  );
};