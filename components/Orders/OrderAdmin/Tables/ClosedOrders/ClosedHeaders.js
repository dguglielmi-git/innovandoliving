import React from "react";
import { Table } from "semantic-ui-react";
import { useTranslation } from "react-i18next";

export default function ClosedHeaders() {
    const { t } = useTranslation();

    return (
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>{ t('orderTableDateRowLabel') }</Table.HeaderCell>
                <Table.HeaderCell>{ t('orderTableClosedDateRowLabel') }</Table.HeaderCell>
                <Table.HeaderCell>{ t('orderTableOrderNumberLabel') }</Table.HeaderCell>
                <Table.HeaderCell>{ t('orderTableTotalOrderLabel') }</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
        </Table.Header>
    )
}