import React from "react";
import { Grid, Image } from "semantic-ui-react";
import Link from "next/link";
import { PATH_LOGO_IMG } from "../../../../utils/constants";

export default function Logo() {

    return (
        <Grid.Column width={ 12 } className="top-bar__left">
            <Link href="/">
                    <Image src={ `/${PATH_LOGO_IMG}` } alt="Logo" />
            </Link>
        </Grid.Column>
    )
}