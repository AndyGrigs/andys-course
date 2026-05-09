import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/slices/authSlice";
import { useEffect, useState } from "react";
import { useRegisterMutation } from "../../../redux/services/auth";
import { IUser } from "../../../app/types";
import { isErrorWithMessage } from "../../../utils/isErrorWithMessage";
import { useTranslation } from "react-i18next";
import styles from "./Registration.module.scss";

type registerData = Omit<IUser, "id"> & { confirmPassword: string };

const Registration = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [error, setError] = useState("");
  const [registerUser, { isLoading }] = useRegisterMutation();
  const { t } = useTranslation();

  useEffect(() => {
    if (user) navigate("/modules");
  }, [navigate, user]);

  const register = async (data: registerData) => {
    setError("");
    try {
      const response = await registerUser(data).unwrap();
      const { code, token, fullName } = response;
      localStorage.setItem("token", token);
      navigate("/user-code", { state: { code, fullName } });
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

        <h1 className={styles.heading}>{t("register")}</h1>
        {/* <p className={styles.subtitle}>{t("registerSubtitle")}</p> */}

        {error && <div className={styles.errorBox}>{error}</div>}

        <Form onFinish={register} layout="vertical" size="large">
          <Form.Item
            name="fullName"
            label={t("name")}
            rules={[{ required: true, message: t("writeYourName") }]}
          >
            <Input
              placeholder={t("placeholderFullName")}
              onChange={(e) => e.target.value.trim()}
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.submitBtn}
              loading={isLoading}
            >
              {t("register")}
            </Button>
          </Form.Item>
        </Form>

        <div className={styles.footer}>
          <span className={styles.footerRow}>
            {t("alreadyHaveAccount")}
            <Link to="/login">{t("login")}</Link>
          </span>
        </div>

      </div>
    </div>
  );
};

export default Registration;
