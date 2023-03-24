import React from "react";
import { Grid, Image } from "semantic-ui-react";
import Link from "next/link";
import { PATH_LOGO_IMG } from "../../../../utils/constants";

export default function Logo() {

    return (
        <Grid.Column width={ 12 } className="top-bar__left">
            <Link href="/">
                <a>
                    <Image src={ `/${PATH_LOGO_IMG}` } alt="Logo" />
                </a>
            </Link>
        </Grid.Column>
    )
}