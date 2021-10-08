import React from "react";
import { Menu, Icon, Label } from "semantic-ui-react";
import Link from "next/link";
import { faStore } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LargeMenu(props) {
    const { onShowModal, user, logout, prodCounter, t } = props;

    return (
        <Menu secondary>
            { user ? (
                <>
                    <Link href="/orders">
                        <Menu.Item as="a">
                            <Icon name="file alternate" />
                            { t('headerMenuMyOrders') }
                        </Menu.Item>
                    </Link>
                    <Link href="/wishlist">
                        <Menu.Item as="a">
                            <Icon name="heart outline" />
                            { t('headerMenuFavorites') }
                        </Menu.Item>
                    </Link>
                    <Link href="/showroom">
                        <Menu.Item as="a">
                            <FontAwesomeIcon icon={ faStore } color="grey" />
                            <span style={ { marginLeft: '10px' } }>{ t('headerMenuShowroom') }</span>
                        </Menu.Item>
                    </Link>
                    <Link href="/account">
                        <Menu.Item as="a">
                            <Icon name="user outline" />
                            { user.name } { user.lastname }
                        </Menu.Item>
                    </Link>
                    <Link href="/cart">
                        <Menu.Item as="a" className="m-0">
                            <Icon name="cart" />
                            { prodCounter > 0 &&
                                (<Label color="red" floating circular size="mini">
                                    { prodCounter }
                                </Label>) }
                        </Menu.Item>
                    </Link>
                    <Menu.Item onClick={ logout }>
                        <Icon name="power off" />
                    </Menu.Item>
                </>
            ) : (
                <Menu.Item as="a" onClick={ onShowModal }>
                    <Icon name="user outline" />
                    { t('headerMenuMyAccount') }
                </Menu.Item>
            )
            }
        </Menu >
    )
}
