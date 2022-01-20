import React, { useState, useEffect } from "react";
import { map } from "lodash";
import { Menu, Icon, Label, Dropdown } from "semantic-ui-react";
import useWindowSize from "../../../hooks/useWindowSize";
import useCart from "../../../hooks/useCart";
import { useTranslation } from "react-i18next";
import { RES_LARGE } from "../../../utils/breakpoint";
import { LINK_TO_CART } from "../../../utils/constants";
import ItemsOptions from "./ItemsOptions";
import ItemsAccount from "./ItemsAccount";
import LargeMenu from "./LargeMenu";
import DropdownLanguages from "./MenuItems/DropdownLanguages";
import Link from "next/link";
import { languages } from "../../../locales/i18n";
import i18n from "../../../locales/i18n";

export default function MenuOptions(props) {
    const { onShowModal, user, logout } = props;
    const [prodCounter, setProdCounter] = useState(0);
    const [queryCounter, setQueryCounter] = useState(0);
    const { productsCart } = useCart();
    const { width } = useWindowSize();
    const { t } = useTranslation();
    const [languageSelected, setLanguageSelected] = useState(null)

    useEffect(() => {
        (async () => {
            const amount = await productsCart;
            setProdCounter(amount);
        })();
    }, [productsCart]);

    useEffect(() => {
        map(languages.resources, (lang) => {
            if (lang.lang == i18n.language) {
                setLanguageSelected(lang);
            }
        })
    }, [])

    const selectLang = (lang) => {
        setLanguageSelected(lang);
        i18n.changeLanguage(lang.lang);
    }

    const textUser = (user) && `${user.name} ${user.lastname}`;
    return (
        <Menu secondary>
            { user ? (
                <>
                    { width < RES_LARGE ? (
                        <>
                            <DropdownLanguages
                                languages={ languages }
                                onClick={ selectLang }
                                languageSelected={ languageSelected }
                            />
                            <Link href={ LINK_TO_CART }>
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
                            queryCounter={ queryCounter }
                            languages={ languages }
                            selectLang={ selectLang }
                            languageSelected={ languageSelected }
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