import React from "react"
import { Table, Button } from 'semantic-ui-react';

export default function OrderTable(props) {
    const { t } = props;
    
    const buttonColor = 'green';
    const buttonSize = 'mini';

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
                <Table.Row>
                    <Table.Cell>10/10/2021</Table.Cell>
                    <Table.Cell>22928300</Table.Cell>
                    <Table.Cell>$28.000</Table.Cell>
                    <Table.Cell>En Preparación</Table.Cell>
                    <Table.Cell>4</Table.Cell>
                    <Table.Cell>
                        <Button size={ buttonSize } color={ buttonColor }>
                            Ver Detalle
                        </Button>
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>10/10/2021</Table.Cell>
                    <Table.Cell>22928300</Table.Cell>
                    <Table.Cell>$28.000</Table.Cell>
                    <Table.Cell>En Preparación</Table.Cell>
                    <Table.Cell>4</Table.Cell>
                    <Table.Cell><Button size={ buttonSize } color={ buttonColor }>Ver Detalle</Button></Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>10/10/2021</Table.Cell>
                    <Table.Cell>22928300</Table.Cell>
                    <Table.Cell>$28.000</Table.Cell>
                    <Table.Cell>En Preparación</Table.Cell>
                    <Table.Cell>4</Table.Cell>
                    <Table.Cell><Button size={ buttonSize } color={ buttonColor }>Ver Detalle</Button></Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    )
}