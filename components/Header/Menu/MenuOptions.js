import React, { useState, useEffect } from "react";
import { Menu, Icon, Label, Dropdown } from "semantic-ui-react";
import useWindowSize from "../../../hooks/useWindowSize";
import useCart from "../../../hooks/useCart";
import { RES_MEDIUM } from "../../../utils/breakpoint";
import ItemsOptions from "./ItemsOptions";
import ItemsAccount from "./ItemsAccount";
import LargeMenu from "./LargeMenu";
import Link from "next/link";

export default function MenuOptions(props) {
    const { onShowModal, user, logout, t } = props;
    const [prodCounter, setProdCounter] = useState(0);
    const { productsCart } = useCart();
    const { width } = useWindowSize();

    useEffect(() => {
        (async () => {
            const amount = await productsCart;
            setProdCounter(amount);
        })();
    }, [productsCart]);

    const textUser = (user) && `${user.name} ${user.lastname}`;
    return (
        <Menu secondary>
            { user ? (
                <>
                    { width < RES_MEDIUM ? (
                        <>
                            <Link href="/cart">
                                <Menu.Item as="a" className="m-0">
                                    <Icon name="cart" />
                                    { prodCounter > 0 &&
                                        (<Label color="red" floating circular size="mini">
                                            { prodCounter }
                                        </Label>) }
                                </Menu.Item>
                            </Link>

                            <Dropdown icon="cog" className="dropdown-options" pointing="top right">
                                <Dropdown.Menu>
                                    <ItemsOptions t={ t } />
                                    <ItemsAccount textUser={ textUser } logout={ logout } t={ t } />
                                </Dropdown.Menu>
                            </Dropdown>
                        </>
                    ) : (
                        <LargeMenu
                            onShowModal={ onShowModal }
                            user={ user }
                            logout={ logout }
                            productsCart={ productsCart }
                            prodCounter={ prodCounter }
                            t={ t }
                        />

                    ) }
                </>
            ) : (
                <Menu.Item as="a" onClick={ onShowModal }>
                    <Icon name="user outline" />
                    { t('headerMenuMyAccount') }
                </Menu.Item>
            ) }
        </Menu >
    )
}