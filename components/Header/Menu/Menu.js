import React, { useState, useEffect } from "react";
import { Container, Grid } from "semantic-ui-react";
import BasicModal from "../../Modal/BasicModal";
import Auth from "../../Auth/";
import useAuth from "../../../hooks/useAuth";
import { getMeApi } from "../../../api/user";
import { getPlatformsApi } from "../../../api/platform";
import { useTranslation } from "react-i18next";
import MenuCategories from "./MenuCategories";
import MenuOptions from "./MenuOptions";
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
                    <Grid.Column className="menu__left" computer={ 4 } tablet={ 1 } mobile={ 1 }>
                        <MenuCategories platforms={ platforms } t={ t } />
                    </Grid.Column>
                    <Grid.Column className="menu__right" computer={ 12 } tablet={ 15 } mobile={ 15 }>
                        { user !== undefined && (
                            <MenuOptions
                                onShowModal={ onShowModal }
                                user={ user }
                                logout={ logout }
                                t={ t }
                            />
                        ) }
                    </Grid.Column>
                </Grid>
            </Container>

            <BasicModal show={ showModal } setShow={ setShowModal } title={ titleModal } size="small">
                <Auth
                    onCloseModal={ onCloseModal }
                    setTitleModal={ setTitleModal }
                />
            </BasicModal>
        </div>
    )
}