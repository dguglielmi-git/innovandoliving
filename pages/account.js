import React from 'react';
import BasicLayout from "../layouts/BasicLayout";
import UserAccount from '../components/Account/UserAccount/UserAccount';

export default function account() {

    return (
        <BasicLayout className="account">
            <UserAccount />
        </BasicLayout>
    )
}

