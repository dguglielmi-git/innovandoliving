import React from 'react';
import BasicLayout from "../layouts/BasicLayout";
import UserAccount from '../components/Account/UserAccount/UserAccount';

export default function Account() {

    return (
        <BasicLayout className="account">
            <UserAccount />
        </BasicLayout>
    )
}

