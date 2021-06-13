import React, { useState, useEffect } from "react";
import { Container, Menu, Grid, Icon, Label, Dropdown } from "semantic-ui-react";
import Link from "next/link";
import BasicModal from "../../Modal/BasicModal";
import { map } from "lodash";
import Auth from "../../Auth/";
import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart";
import { getMeApi } from "../../../api/user";
import { getPlatformsApi } from "../../../api/platform";
import useWindowSize from "../../../hooks/useWindowSize";
import { useTranslation } from "react-i18next";
import { RES_MEDIUM } from "../../../utils/breakpoint";
import { faStore } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../locales/i18n";

export default function MenuWeb() {
    const { t } = useTranslation();
    const [platforms, setPlatforms] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("Inicia sesion");
    const [user, setUser] = useState(undefined);
    const { auth, logout } = useAuth();

    useEffect(() => {
        (async () => {
            const response = await getMeApi(logout);
            setUser(response);
        })();
    }, [auth])

    useEffect(() => {
        (async () => {
            const response = await getPlatformsApi();
            setPlatforms(response || []);
        })();
    }, []);

    const onShowModal = () => setShowModal(true);
    const onCloseModal = () => setShowModal(false);

    return (
        <div className="menu">
            <Container>
                <Grid>
                    <Grid.Column className="menu__left" computer={4} tablet={1} mobile={1}>
                        <MenuPlatforms platforms={platforms} t={t} />
                    </Grid.Column>
                    <Grid.Column className="menu__right" computer={12} tablet={15} mobile={15}>
                        {user !== undefined && (
                            <MenuOptions onShowModal={onShowModal}
                                user={user}
                                logout={logout}
                                t={t}
                            />
                        )}
                    </Grid.Column>
                </Grid>
            </Container>
            <BasicModal
                show={showModal}
                setShow={setShowModal}
                title={titleModal}
                size="small">
                <Auth onCloseModal={onCloseModal} setTitleModal={setTitleModal} />
            </BasicModal>
        </div>
    )
}

function MenuPlatforms(props) {
    const { platforms, t } = props;
    return (
        <Dropdown icon="options" pointing="top left">
            <Dropdown.Menu>
                <Label content={t('headerMenuCategories')} />
                <Dropdown.Divider />
                {map(platforms, (platform) => (
                    <Link href={`/productos/${platform.url}`} key={platform._id}>
                        <Dropdown.Item text={platform.title} />
                    </Link>
                ))}
                <Dropdown.Divider />
            </Dropdown.Menu>
        </Dropdown>
    )
}

function MenuOptions(props) {
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
            {user ? (
                <>
                    { width < RES_MEDIUM ? (
                        <>
                            <Link href="/cart">
                                <Menu.Item as="a" className="m-0">
                                    <Icon name="cart" />
                                    {prodCounter > 0 &&
                                        (<Label color="red" floating circular size="mini">
                                            {prodCounter}
                                        </Label>)}
                                </Menu.Item>
                            </Link>

                            <Dropdown icon="cog" className="dropdown-options" pointing="top right">
                                <Dropdown.Menu>
                                    <ItemsOptions t={t} />
                                    <ItemsAccount textUser={textUser} logout={logout} t={t} />
                                </Dropdown.Menu>
                            </Dropdown>
                        </>
                    ) : (
                        <LargeMenu
                            onShowModal={onShowModal}
                            user={user}
                            logout={logout}
                            productsCart={productsCart}
                            prodCounter={prodCounter}
                            t={t}
                        />

                    )}
                </>

            ) : (
                <Menu.Item as="a" onClick={onShowModal}>
                    <Icon name="user outline" />
                    {t('headerMenuMyAccount')}
                </Menu.Item>
            )
            }
        </Menu >
    )
}

function ItemsOptions(props) {
    const { t } = props;
    return (
        <>
            <Label content={t('headerMenuOptions')} />
            <Link href="/orders">
                <Dropdown.Item icon="file alternate" text={t('headerMenuMyOrders')} />
            </Link>
            <Link href="/wishlist">
                <Dropdown.Item icon="heart outline" text={t('headerMenuFavorites')} />
            </Link>
            <Link href="/showrrom">
                <Dropdown.Item>
                    <FontAwesomeIcon icon={faStore} color="grey" />
                    <span style={{ marginLeft: '10px' }}>{t('headerMenuShowroom')}</span>
                </Dropdown.Item>
            </Link>
            <Dropdown.Divider />
        </>
    );
}

function ItemsAccount(props) {
    const { textUser, logout, t } = props;

    return (
        <>
            <Label content={t('headerMenuAccount')} />
            <Link href="/account">
                <Dropdown.Item icon="user outline" text={textUser} />
            </Link>
            <Dropdown.Item icon="power off" text="Salir" onClick={logout} />
            <Dropdown.Divider />
        </>
    );
}


function LargeMenu(props) {
    const { onShowModal, user, logout, prodCounter, t } = props;

    return (
        <Menu secondary>
            {user ? (
                <>
                    <Link href="/orders">
                        <Menu.Item as="a">
                            <Icon name="file alternate" />
                            {t('headerMenuMyOrders')}
                        </Menu.Item>
                    </Link>
                    <Link href="/wishlist">
                        <Menu.Item as="a">
                            <Icon name="heart outline" />
                            {t('headerMenuFavorites')}
                        </Menu.Item>
                    </Link>
                    <Link href="/showroom">
                        <Menu.Item as="a">
                            <FontAwesomeIcon icon={faStore} color="grey" />
                            <span style={{ marginLeft: '10px' }}>{t('headerMenuShowroom')}</span>
                        </Menu.Item>
                    </Link>
                    <Link href="/account">
                        <Menu.Item as="a">
                            <Icon name="user outline" />
                            {user.name} {user.lastname}
                        </Menu.Item>
                    </Link>
                    <Link href="/cart">
                        <Menu.Item as="a" className="m-0">
                            <Icon name="cart" />
                            {prodCounter > 0 &&
                                (<Label color="red" floating circular size="mini">
                                    {prodCounter}
                                </Label>)}
                        </Menu.Item>
                    </Link>
                    <Menu.Item onClick={logout}>
                        <Icon name="power off" />
                    </Menu.Item>
                </>
            ) : (
                <Menu.Item as="a" onClick={onShowModal}>
                    <Icon name="user outline" />
                    {t('headerMenuMyAccount')}
                </Menu.Item>
            )
            }
        </Menu >
    )
}
