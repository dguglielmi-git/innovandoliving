import React, { useState } from 'react';
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useTranslation } from "react-i18next";
import "../../locales/i18n";

export default function Auth(props) {
    const { onCloseModal, setTitleModal } = props;
    const { t } = useTranslation();
    const [showLogin, setShowLogin] = useState(true);

    const showLoginForm = () => {
        setShowLogin(true);
        setTitleModal(t('authLoginTitle'))
    }
    const showRegisterForm = () => {
        setShowLogin(false);
        setTitleModal(t('authRegisterTitle'))
    };

    return showLogin
        ? <LoginForm showRegisterForm={showRegisterForm} onCloseModal={onCloseModal}/>
        : <RegisterForm showLoginForm={showLoginForm} />;
}
