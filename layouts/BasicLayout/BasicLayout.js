import React from 'react';
import { Container } from "semantic-ui-react";
import classNames from "classnames";
import Header from "../../components/Header";

export default function BasicLayout(props) {
    const { children, className, style } = props;

    return (
        <>
            <Container fluid className={ classNames("basic-layout", {
                [className]: className,
            }) }>
                <Header />
                <Container className="basic-layout-content" style={style}>
                    { children }
                </Container>
            </Container>
        </>
    )
}
