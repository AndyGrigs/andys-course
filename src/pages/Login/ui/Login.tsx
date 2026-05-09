import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/slices/authSlice";
import { UserData, useLoginMutation } from "../../../redux/services/auth";
import { isErrorWithMessage } from "../../../utils/isErrorWithMessage";
import { useTranslation } from "react-i18next";
import styles from "./Login.module.scss";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [error, setError] = useState("");
  const user = useSelector(selectUser);
  const [loginUser, { isLoading }] = useLoginMutation();

  useEffect(() => {
    if (user) navigate("/modules");
  }, [user, navigate]);

  const onFinish = async (data: UserData) => {
    setError("");
    try {
      const response = await loginUser(data).unwrap();
      localStorage.setItem("token", response.token);
    } catch (err) {
      setError(isErrorWithMessage(err) ? err.data.message : t("genericError"));
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>

        <div className={styles.brand}>
          <img
            className={styles.logo}
            src="https://cdn.pixabay.com/photo/2013/07/13/10/09/germany-156642_1280.png"
            alt="AndyKurs logo"
          />
          <span className={styles.brandName}>
            <span className={styles.brandAccent}>Andy</span>
            <span className={styles.brandHighlight}>Kurs</span>
          </span>
        </div>

        <h1 className={styles.heading}>{t("welcomeBack")}</h1>
        <p className={styles.subtitle}>{t("loginSubtitle")}</p>

        {error && <div className={styles.errorBox}>{error}</div>}

        <Form onFinish={onFinish} layout="vertical" size="large">
          <Form.Item
            name="fullName"
            label={t("name")}
            rules={[{ required: true, message: t("writeYourName") }]}
          >
            <Input placeholder={t("placeholderFullName")} />
          </Form.Item>

          <Form.Item
            name="code"
            label={t("code")}
            rules={[{ required: true, message: t("enterYourCode") }]}
          >
            <Input.Password placeholder="••••••••" />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.submitBtn}
              loading={isLoading}
            >
              {t("login")}
            </Button>
          </Form.Item>
        </Form>

        <div className={styles.footer}>
          <span className={styles.footerRow}>
            {t("dontHaveAccount")}
            <Link to="/register">{t("register")}</Link>
          </span>
          <span className={styles.footerRow}>
            {t("dontKnowCode")}
            <Link to="/register-update">{t("restore")}</Link>
          </span>
        </div>

      </div>
    </div>
  );
};

export default Login;
