import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useAuth from "../../../hooks/useAuth";
import { getMeApi } from "../../../api/user";
import { getAddressesApi } from "../../../api/address";
import Configuration from "./sections/Configuration";
import Addresses from "./sections/Addresses";

export default function UserAccount() {
    const [user, setUser] = useState(undefined);
    const { auth, logout, setReloadUser } = useAuth();
    const [addresses, setAddresses] = useState(null);
    const [reloadAddresses, setReloadAddresses] = useState(false);
    const router = useRouter();

    useEffect(() => {
        (async () => {
            const response = await getAddressesApi(logout);
            setAddresses(response || []);
        })()
        setReloadAddresses(false);
    }, [reloadAddresses]);

    useEffect(() => {
        (async () => {
            const response = await getMeApi(logout);
            setUser(response || null);
        })()
    }, [auth]);

    if (user === undefined) return null;

    if (!auth && !user) {
        router.replace("/");
        return null;
    }

    return (
        <>
            <Configuration
                user={ user }
                logout={ logout }
                setReloadUser={ setReloadUser }
            />
            <Addresses
                addresses={ addresses }
                reloadAddresses={ reloadAddresses }
                setReloadAddresses={ setReloadAddresses }
            />
        </>
    )
}

