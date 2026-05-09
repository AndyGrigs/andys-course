import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUpdateCodeMutation } from "../../../redux/services/auth";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/slices/authSlice";
import { isErrorWithMessage } from "../../../utils/isErrorWithMessage";
import { IUser } from "../../../app/types";
import { useTranslation } from "react-i18next";
import styles from "./UpdateCodePage.module.scss";

type registerData = Omit<IUser, "id"> & { confirmCode: string };

const UpdateCode = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [error, setError] = useState("");
  const [updateCode, { isLoading }] = useUpdateCodeMutation();
  const { t } = useTranslation();

  useEffect(() => {
    if (user) navigate("/modules");
  }, [navigate, user]);

  const onFinish = async (data: registerData) => {
    setError("");
    try {
      const response = await updateCode(data).unwrap();
      const { code, fullName } = response;
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

        <h1 className={styles.heading}>{t("resetPasswordTitle")}</h1>
        {/* <p className={styles.subtitle}>{t("resetSubtitle")}</p> */}

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
            name="repeatName"
            label={t("name") + " ×2"}
            rules={[{ required: true, message: t("writeYourName") }]}
          >
            <Input placeholder={t("placeholderFullName")} />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.submitBtn}
              loading={isLoading}
            >
              {t("getCodeAttempt")}
            </Button>
          </Form.Item>
        </Form>

        <div className={styles.footer}>
          <span className={styles.footerRow}>
            <Link to="/login">{t("login")}</Link>
          </span>
        </div>

      </div>
    </div>
  );
};

export default UpdateCode;
