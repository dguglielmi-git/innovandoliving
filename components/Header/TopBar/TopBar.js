import React from "react";
import { Container, Grid } from "semantic-ui-react"
import Logo from "./sections/Logo";

export default function TopBar() {
    return (
        <div className="top-bar">
            <Container>
                <Grid className="top-bar">
                    <Logo />
                </Grid>
            </Container>
        </div>
    )
}