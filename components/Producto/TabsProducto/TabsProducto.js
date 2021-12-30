import React from 'react';
import { Tab } from "semantic-ui-react";
import InfoProducto from "../InfoProducto";
import Questions from '../Questions/Questions';
import { useTranslation } from 'react-i18next';

export default function TabsProducto(props) {
    const { producto } = props;
    const { t } = useTranslation();

    const panes = [
        {
            menuItem: t('productQuestions'),
            render: () => (
                <Tab.Pane>
                    <Questions product={ producto } />
                </Tab.Pane>
            )
        },
        {
            menuItem: t('productGalleryLabel'),
            render: () => (
                <Tab.Pane>
                    <InfoProducto producto={ producto } />
                </Tab.Pane>
            )
        },
    ];

    return (
        <Tab className="tabs-producto" panes={ panes } />
    )
}
