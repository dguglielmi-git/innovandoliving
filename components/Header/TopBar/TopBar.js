import React from "react";
import { Container, Grid } from "semantic-ui-react"
import Logo from "./sections/Logo";
import SearchTopBar from "./sections/SearchTopBar";

export default function TopBar() {
    return (
        <div className="top-bar">
            <Container>
                <Grid className="top-bar">
                    <Logo />
                    <SearchTopBar />
                </Grid>
            </Container>
        </div>
    )
}