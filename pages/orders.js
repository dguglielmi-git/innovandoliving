import React from 'react';
import BasicLayout from "../layouts/BasicLayout";
import { useTranslation } from "react-i18next";
import Seo from "../components/Seo";
import Order from '../components/Orders/Order/Order';
import "../locales/i18n";

export default function orders() {
    const { t } = useTranslation();


    return (
        <BasicLayout className="orders">
            <Seo />
            <Order t={ t } />
        </BasicLayout>
    )
}