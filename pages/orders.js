import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { isUserOwner } from '../api/orderMessage';
import BasicLayout from '../layouts/BasicLayout';
import Seo from "../components/Seo";
import Order from '../components/Orders/Order/Order';
import OrderAdmin from '../components/Orders/OrderAdmin/OrderAdmin';
import BasicLoading from '../components/BasicLoading/BasicLoading';
import useAuth from '../hooks/useAuth';

export default function orders() {
    const { t } = useTranslation();
    const { auth } = useAuth();
    const [loading, setLoading] = useState(true);
    const [showAdmin, setShowAdmin] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            if (auth) {
                const { idUser } = auth;
                const res = await isUserOwner(idUser);
                setShowAdmin(res);
            }
            setLoading(false);
        })()
    }, [auth])

    if (loading) return <BasicLoading classValue="orders" label={ t('orderLoading') } />

    return (
        <BasicLayout className="orders">
            <Seo />
            { showAdmin
                ? <OrderAdmin />
                : <Order t={ t } />
            }
        </BasicLayout>
    )
}