import React from "react"
import Link from "next/link";
import { Label, Dropdown } from "semantic-ui-react";
import { map } from "lodash";

export default function MenuCategories(props) {
    const { platforms, t } = props;

    return (
        <Dropdown icon="options" pointing="top left">
            <Dropdown.Menu>
                <Label content={ t('headerMenuCategories') } />
                <Dropdown.Divider />
                { map(platforms, (platform) => (
                    <Link href={ `/productos/${platform.url}` } key={ platform._id }>
                        <Dropdown.Item text={ platform.title } />
                    </Link>
                )) }
                <Dropdown.Divider />
            </Dropdown.Menu>
        </Dropdown>
    )
}