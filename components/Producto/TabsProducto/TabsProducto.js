import React from 'react';
import { Tab } from "semantic-ui-react";
import InfoProducto from "../InfoProducto";

export default function TabsProducto(props) {
    const { producto } = props;
    const panes = [
        {
            menuItem: "Galería:",
            render: () => (
                <Tab.Pane>
                    <InfoProducto producto={producto} />
                </Tab.Pane>
            )
        },
    ];

    return (
        <Tab className="tabs-producto" panes={panes} />
    )
}
