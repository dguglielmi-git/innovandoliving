import React from "react";
import { size } from "lodash";
import { Table, Button } from 'semantic-ui-react';
import { formatDate, numToDollar, translateStatus } from "../../../../utils/util";

export default function OrderTable(props) {
    const { t, orders, setOrderSelected, setShowDetail } = props;

    const buttonColor = 'green';
    const buttonSize = 'mini';

    const openDetails = (order) => {
        setOrderSelected(order);
        setShowDetail(true);
    }

    const totalOrder = (order) =>
        numToDollar(order.items.reduce((sum, i) => sum + (i.quantity * i.unit_price), 0))

    const unreadMessages = (order) => order.messages.filter(msg => msg.msgread == 0).length;

    return (
        <Table color='teal' key='teal'>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Fecha</Table.HeaderCell>
                    <Table.HeaderCell>Orden #</Table.HeaderCell>
                    <Table.HeaderCell>Total Orden</Table.HeaderCell>
                    <Table.HeaderCell>Estado</Table.HeaderCell>
                    <Table.HeaderCell>Msg sin Leer</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                { (size(orders) >= 0) && orders.map((order, index) => (
                    <Table.Row key={ index }>
                        <Table.Cell>{ formatDate(order.dateCreated) }</Table.Cell>
                        <Table.Cell>{ order.mercadoPagoMerchantOrderId }</Table.Cell>
                        <Table.Cell>{ totalOrder(order) }</Table.Cell>
                        <Table.Cell>{ translateStatus(order.status) }</Table.Cell>
                        <Table.Cell>{ unreadMessages(order) }</Table.Cell>
                        <Table.Cell>
                            <Button size={ buttonSize } color={ buttonColor }
                                onClick={ () => openDetails(order) }>
                                Ver Detalle
                            </Button>
                        </Table.Cell>
                    </Table.Row>
                )) }
                { (size(orders) === 0) && (<p>No hay ordenes procesadas.</p>) }
            </Table.Body>
        </Table>
    )
}