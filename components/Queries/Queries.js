import React, { useState, useEffect } from "react";
import { isUserOwner } from "../../api/orderMessage";
import { getMeApi } from "../../api/user";
import useAuth from "../../hooks/useAuth";
import { USER_CLIENT, USER_OWNER } from "../../utils/constants";
import BasicLoading from "../BasicLoading/BasicLoading";
import QueryAsAdmin from "./QueryAsAdmin";
import QueryAsUser from "./QueryAsUser";

export default function Queries() {
    const { auth, logout } = useAuth();
    const [userType, setUserType] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(async () => {
        setLoading(true);
        const user = await getMeApi(logout);
        if (auth) {
            const { idUser } = auth;
            const res = await isUserOwner(idUser);
            if (res) {
                setUserType(USER_OWNER);
            } else {
                setUserType(USER_CLIENT);
            }
        }
        setLoading(false);
    }, [auth]);

    if (loading) return <BasicLoading classValue="questions" label="Loading ..." />
    if (userType === USER_OWNER) return <QueryAsAdmin />
    else return <QueryAsUser />

}