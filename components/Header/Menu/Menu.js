import React, { useState, useEffect } from "react";
import { Container, Grid } from "semantic-ui-react";
import Auth from "../../Auth/";
import useAuth from "../../../hooks/useAuth";
import { getMeApi } from "../../../api/user";
import { getSortedPlatforms } from "../../../api/platform";
import BasicModal from "../../Modal/BasicModal";
import GridCategories from "./Grid/GridCategories";
import GridOptions from "./Grid/GridOptions";

export default function MenuWeb() {
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
            const response = await getSortedPlatforms();
            setPlatforms(response || []);
        })();
    }, []);

    const onShowModal = () => setShowModal(true);
    const onCloseModal = () => setShowModal(false);

    return (
        <div className="menu">
            <Container>
                <Grid>
                    <GridCategories platforms={ platforms } />
                    <GridOptions
                        user={ user }
                        onShowModal={ onShowModal }
                        logout={ logout }
                    />
                </Grid>
            </Container>

            <BasicModal
                show={ showModal }
                setShow={ setShowModal }
                title={ titleModal }
                size="small">
                <Auth
                    onCloseModal={ onCloseModal }
                    setTitleModal={ setTitleModal }
                />
            </BasicModal>
        </div>
    )
}