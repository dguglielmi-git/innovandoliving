import React from "react";
import { Grid } from "semantic-ui-react";
import MenuOptions from "../MenuOptions";

export default function GridOptions(props) {
    const { user, onShowModal, logout } = props;

    return (
        <Grid.Column
            className="menu__right"
            computer={ 12 }
            tablet={ 15 }
            mobile={ 15 }
        >
            { user !== undefined && (
                <MenuOptions
                    onShowModal={ onShowModal }
                    user={ user }
                    logout={ logout }
                />
            ) }
        </Grid.Column>
    )
}