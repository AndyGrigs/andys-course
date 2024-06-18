
import { Card, Divider, Typography} from "antd";
import { useSelector } from "react-redux";
import { selectCurrentModule } from "../../../redux/slices/moduleSlice";
const { Title, Paragraph } = Typography;

interface ModuleText {
  title: string;
  content: string;
  // Add any other properties that might exist here
}

const TextPage = () => {
  const module = useSelector(selectCurrentModule);
  const { title, content } = module?.text as ModuleText;

  return (
    <div style={{ padding: "20px" }}>
      <Paragraph  style={{ maxWidth: 800, margin: "0 auto" }}>🎯Прочитайте текст, занотуйте собі нові для вас слова.</Paragraph>
      <Divider/>
      <Card bordered={false} style={{ maxWidth: 800, margin: "0 auto" }}>
        <Typography>
          <Title level={4} style={{textAlign: 'center'}}>{title}</Title>
          <Paragraph>{content}</Paragraph>
        </Typography>
      </Card>
    </div>
  );
};

export default TextPage;
