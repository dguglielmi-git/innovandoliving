import React from "react";
import { Menu, Icon, Label } from "semantic-ui-react";
import Link from "next/link";
import { faStore } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    LINK_TO_CART,
    LINK_TO_QUESTIONS,
    LINK_TO_ORDERS,
    LINK_TO_WISHLIST,
    LINK_TO_SHOWROOM,
    LINK_TO_ACCOUNT
} from "../../../utils/constants";
export default function LargeMenu(props) {
    const { onShowModal, user, logout, prodCounter, t, queryCounter } = props;

    return (
        <Menu secondary>
            { user ? (
                <>
                    <Link href={ LINK_TO_QUESTIONS }>
                        <Menu.Item as="a">
                            { queryCounter > 0 &&
                                (<Label color="red" floating circular size="mini">
                                    { queryCounter }
                                </Label>) }
                            <Icon name="comment" />
                            { t('headerMenuQueries') }
                        </Menu.Item>
                    </Link>
                    <Link href={ LINK_TO_ORDERS }>
                        <Menu.Item as="a">
                            <Icon name="file alternate" />
                            { t('headerMenuMyOrders') }
                        </Menu.Item>
                    </Link>
                    <Link href={ LINK_TO_WISHLIST }>
                        <Menu.Item as="a">
                            <Icon name="heart outline" />
                            { t('headerMenuFavorites') }
                        </Menu.Item>
                    </Link>
                    <Link href={ LINK_TO_SHOWROOM }>
                        <Menu.Item as="a">
                            <FontAwesomeIcon icon={ faStore } color="grey" />
                            <span style={ { marginLeft: '10px' } }>{ t('headerMenuShowroom') }</span>
                        </Menu.Item>
                    </Link>
                    <Link href={ LINK_TO_ACCOUNT }>
                        <Menu.Item as="a">
                            <Icon name="user outline" />
                            { user.name } { user.lastname }
                        </Menu.Item>
                    </Link>
                    <Link href={ LINK_TO_CART }>
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
