import React from 'react';
import { Grid, Image } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import Info from './Info';
import { MOBILE_COL_SIZE } from '../../../utils/constants';
import "../../../locales/i18n";

export default function HeaderProducto(props) {
    const { producto } = props;
    const { t } = useTranslation();
    const { poster, title } = producto;

    return (
        <Grid className="header-producto">
            <Grid.Column mobile={ MOBILE_COL_SIZE } tablet={ 6 } computer={ 6 }>
                <div className="header-producto__image">
                    <Image src={ poster.url } alt={ title } />
                </div>
            </Grid.Column>
            <Grid.Column mobile={ MOBILE_COL_SIZE } tablet={ 10 } computer={ 10 }>
                <Info producto={ producto } t={ t } />
            </Grid.Column>
        </Grid>
    )
}

