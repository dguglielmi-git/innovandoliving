import React from 'react';
import Head from "next/head";

export default function Seo(props) {
    const { title, description } = props;

    return (
        <Head>
            <title>{title}</title>
            <meta property="description" content={description} />
        </Head>
    );
}

Seo.defaultProps = {
    title: "Innovando Living Sillones",
    description: "Los mejores sillones de Argentina",
}
