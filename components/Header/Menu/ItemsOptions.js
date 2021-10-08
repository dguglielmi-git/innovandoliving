import React from "react";
import { Label, Dropdown } from "semantic-ui-react";
import Link from "next/link";
import { faStore } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ItemsOptions(props) {
    const { t } = props;
    return (
        <>
            <Label content={ t('headerMenuOptions') } />
            <Link href="/orders">
                <Dropdown.Item icon="file alternate" text={ t('headerMenuMyOrders') } />
            </Link>
            <Link href="/wishlist">
                <Dropdown.Item icon="heart outline" text={ t('headerMenuFavorites') } />
            </Link>
            <Link href="/showrrom">
                <Dropdown.Item>
                    <FontAwesomeIcon icon={ faStore } color="grey" />
                    <span style={ { marginLeft: '10px' } }>{ t('headerMenuShowroom') }</span>
                </Dropdown.Item>
            </Link>
            <Dropdown.Divider />
        </>
    );
}