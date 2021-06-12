import React, { useState, useEffect } from 'react';
import { Grid, Button, Confirm, Icon } from "semantic-ui-react";
import { map, size } from "lodash";
import { getAddressesApi, deleteAddressApi } from '../../../api/address';
import useAuth from "../../../hooks/useAuth";
import useWindowSize from "../../../hooks/useWindowSize";
import { toast } from "react-toastify";
import { Card } from "react-bootstrap";
import { RES_SMALL } from "../../../utils/breakpoint";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ListAddress(props) {
    const { reloadAddresses, setReloadAddresses, openModal } = props;
    const [addresses, setAddresses] = useState(null);
    const [addressActive, setAddressActive] = useState(null);
    const [confirmDialog, setConfirmDialog] = useState(false);
    const { auth, logout } = useAuth();

    const openDelete = () => setConfirmDialog(true);
    const cancelDelete = () => setConfirmDialog(false);

    const deleteAddress = async () => {
        setLoadingDelete(true);
        const response = await deleteAddressApi(address.id, logout);
        if (response) {
            setReloadAddresses(true);
            toast.success("La direccion ha sido eliminada correctamente");
        } else {
            toast.error("Error al intentar eliminar la direccion");
        }
        setLoadingDelete(false);
        setConfirmDialog(false);
    };

    useEffect(() => {
        (async () => {
            const response = await getAddressesApi(auth.idUser, logout);
            setAddresses(response || []);
            setReloadAddresses(false);
        })()
    }, [reloadAddresses]);

    if (!addresses) return null;

    return (
        <>
            <div className="list-address">
                {size(addresses) === 0 ? (
                    <h3>No hay ninguna direccion creada.</h3>
                ) : (
                    <Grid>
                        {size(addresses) === 0 ? (
                            <h3>No hay direcciones cargadas</h3>
                        ) : (
                            <>
                                <Grid>
                                    <div>
                                        {map(addresses, (address) => (
                                            <Grid.Column
                                                key={address.id}
                                                mobile={16}
                                                tablet={8}
                                                computer={4}>
                                                <Address
                                                    address={address}
                                                    logout={logout}
                                                    setReloadAddresses={setReloadAddresses}
                                                    addressActive={addressActive}
                                                    setAddressActive={setAddressActive}
                                                    openModal={openModal}
                                                    confirmDialog={confirmDialog}
                                                    setConfirmDialog={setConfirmDialog}
                                                    openDelete={openDelete}
                                                    cancelDelete={cancelDelete}
                                                />
                                            </Grid.Column>
                                        ))}
                                    </div>
                                </Grid>

                            </>
                        )}
                    </Grid>
                )}
            </div>
            <Confirm size="mini" open={confirmDialog} onCancel={cancelDelete}
                onConfirm={deleteAddress} content="Seguro quiere eliminar la dirección?" />
        </>
    )
}

function Address(props) {
    const { address, logout, setReloadAddresses, openModal,
        confirmDialog, setConfirmDialog, openDelete, cancelDelete } = props;
    const [loadingDelete, setLoadingDelete] = useState(false);

    const { width } = useWindowSize();

    const cardSize = () => {
        return width < RES_SMALL ? { width: '14rem' } : { width: '30rem' };
    }

    return (
        <>
            <div className="box-address">
                <Card style={cardSize()}>
                    <Card.Header>{address.title}</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            {address.address} - {address.city}
                        </Card.Text>
                        <Card.Text>
                            {address.state} {address.postalCode}
                        </Card.Text>
                        <Card.Text>
                            Tel. {address.phone}
                        </Card.Text>
                        <Card.Text>
                            <div className="box-address__options">
                                <Icon name="trash alternate" onClick={() => openDelete()} />
                                <Icon name="edit" onClick={() => cancelDelete()} />
                            </div>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>

        </>
    )
}

/**
 *  return (
        <div className="address">
            <p>{address.title}</p>
            <p>{address.name}</p>
            <p>{address.address}</p>
            <p>
                {address.state}, {address.city} {address.postalCode}
            </p>
            <p>{address.phone}</p>
            <div className="actions">
                <Button primary
                    onClick={() => openModal(`Editar: ${address.title}`, address)}
                >
                    Editar
                </Button>
                <Button
                    onClick={openDelete}
                    loading={loadingDelete}>
                    Eliminar
                </Button>
            </div>
            <Confirm size="mini" open={confirmDialog} onCancel={cancelDelete}
                onConfirm={deleteAddress} content="Seguro quiere eliminar la dirección?" />
        </div>
    )
 */