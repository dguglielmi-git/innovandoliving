import React from "react";
import { map } from "lodash";
import { Grid } from "semantic-ui-react";
import Address from "./Address";
import {
    MOBILE_COL_SIZE,
    TABLET_COL_SIZE,
    COMPUTER_COL_SIZE
} from "../../../utils/constants";

export default function ListAddressGrid(props) {

    const {
        t,
        addresses,
        selectEnable,
        logout,
        setReloadAddresses,
        openModal,
        idSelected,
        setIdSelected
    } = props;

    return (
        <Grid>
            <div>
                { map(addresses, (address) => (
                    <Grid.Column
                        key={ address.id }
                        mobile={ MOBILE_COL_SIZE }
                        tablet={ TABLET_COL_SIZE }
                        computer={ COMPUTER_COL_SIZE }>
                        <Address
                            selectEnable={ selectEnable }
                            address={ address }
                            logout={ logout }
                            setReloadAddresses={ setReloadAddresses }
                            openModal={ openModal }
                            idSelected={ idSelected }
                            setIdSelected={ setIdSelected }
                            t={ t }
                        />
                    </Grid.Column>
                )) }
            </div>
        </Grid>
    )
}