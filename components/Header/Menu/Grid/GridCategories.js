import React from "react"
import { Grid } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import MenuCategories from "../MenuCategories";

export default function GridCategories(props) {
    const { platforms } = props;
    const { t } = useTranslation();

    return (
        <Grid.Column className="menu__left" computer={ 4 } tablet={ 1 } mobile={ 1 }>
            <MenuCategories platforms={ platforms } t={ t } />
            { t('headerMenuProducts') }
        </Grid.Column>
    )
}