import React from "react";
import { size } from "lodash";
import { Table, Button } from "semantic-ui-react";
import { formatDate, numToDollar, translateStatus } from "../../../../../utils/util";
import { useTranslation } from "react-i18next";
import { USER_OWNER } from "../../../../../utils/constants";

export default function ActiveBody(props) {
    const { orders, openDetails, userType } = props;
    const { t } = useTranslation();
    const buttonColor = 'green';
    const buttonSize = 'mini';

    const totalOrder = (order) =>
        numToDollar(order.items.reduce((sum, i) => sum + (i.quantity * i.unit_price), 0))

    const unreadMessages = (order) =>
        order.messages.filter(msg =>
            (userType === USER_OWNER)
                ? msg.msgreadowner == 0
                : msg.msgread == 0
        ).length;

    return (
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
                            { t('orderTableSeeDetailButtonLabel') }
                        </Button>
                    </Table.Cell>
                </Table.Row>
            )) }
            { (size(orders) === 0) && (<p>{ t('orderTableNoOrderProcessed') }</p>) }
        </Table.Body>
    )
}