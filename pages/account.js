import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import BasicLayout from "../layouts/BasicLayout";
import useAuth from "../hooks/useAuth";
import { getMeApi } from "../api/user";
import { getAddressesApi } from "../api/address"
import ChangeNameForm from "../components/Account/ChangeNameForm";
import ChangeEmailForm from "../components/Account/ChangeEmailForm";
import ChangePasswordForm from "../components/Account/ChangePasswordForm";
import ListAddress from "../components/Account/ListAddress";

export default function account() {
    const [user, setUser] = useState(undefined);
    const { auth, logout, setReloadUser } = useAuth();
    const [addresses, setAddresses] = useState(null);
    const router = useRouter();

    useEffect(() => {
        (async () => {
            const response = await getAddressesApi(auth.idUser, logout);
            setAddresses(response || []);
        })()
    }, []);

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
        <BasicLayout className="account">
            <Configuration
                user={ user }
                logout={ logout }
                setReloadUser={ setReloadUser }
            />
            <Addresses addresses={ addresses } />
        </BasicLayout>
    )
}

function Configuration(props) {
    const { user, logout, setReloadUser } = props;
    return (
        <div className="account__configuration">
            <div className="title">Configuracion</div>
            <div className="data">
                <ChangeNameForm
                    user={ user }
                    logout={ logout }
                    setReloadUser={ setReloadUser }
                />
                <ChangeEmailForm
                    user={ user }
                    logout={ logout }
                    setReloadUser={ setReloadUser }
                />
                <ChangePasswordForm
                    user={ user }
                    logout={ logout }
                />
            </div>
        </div>
    );
}

function Addresses(props) {
    const { addresses } = props;
    const [reloadAddresses, setReloadAddresses] = useState(false);

    return (
        <div className="account__addresses">
            <div className="title">Direcciones

            </div>
            <div className="data">
                <ListAddress
                    addresses={ addresses }
                    reloadAddresses={ reloadAddresses }
                    setReloadAddresses={ setReloadAddresses }
                />
            </div>

        </div>
    )
}
