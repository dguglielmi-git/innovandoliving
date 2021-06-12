import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import BasicLayout from "../layouts/BasicLayout";
import useAuth from "../hooks/useAuth";
import { getMeApi } from "../api/user";
import ChangeNameForm from "../components/Account/ChangeNameForm";
import ChangeEmailForm from "../components/Account/ChangeEmailForm";
import ChangePasswordForm from "../components/Account/ChangePasswordForm";
import ListAddress from "../components/Account/ListAddress";

export default function account() {
    const [user, setUser] = useState(undefined);
    const { auth, logout, setReloadUser } = useAuth();
    const router = useRouter();

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
                user={user}
                logout={logout}
                setReloadUser={setReloadUser}
            />
            <Addresses />
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
                    user={user}
                    logout={logout}
                    setReloadUser={setReloadUser}
                />
                <ChangeEmailForm
                    user={user}
                    logout={logout}
                    setReloadUser={setReloadUser}
                />
                <ChangePasswordForm
                    user={user}
                    logout={logout}
                />
            </div>
        </div>
    );
}

function Addresses() {
    const [reloadAddresses, setReloadAddresses] = useState(false);

       return (
        <div className="account__addresses">
            <div className="title">Direcciones
            
            </div>
            <div className="data">
                <ListAddress
                    ListAddress={false}
                    reloadAddresses={reloadAddresses}
                    setReloadAddresses={setReloadAddresses}
                />
            </div>
       
        </div>
    )
}
