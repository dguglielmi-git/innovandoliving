import React from "react";
import { Label, Dropdown } from "semantic-ui-react";
import Link from "next/link";

export default function ItemsAccount(props) {
    const { textUser, logout, t } = props;

    return (
        <>
            <Label content={ t('headerMenuAccount') } />
            <Link href="/account">
                <Dropdown.Item icon="user outline" text={ textUser } />
            </Link>
            <Dropdown.Item icon="power off" text="Salir" onClick={ logout } />
            <Dropdown.Divider />
        </>
    );
}
