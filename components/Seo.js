import React from 'react';
import Head from "next/head";
import i18n from '../locales/i18n';

export default function Seo(props) {
    const { title, description } = props;

    return (
        <Head>
            <title>{ title }</title>
            <meta property="description" content={ description } />
        </Head>
    );
}

Seo.defaultProps = {
    title: i18n.t('seoTitle'),
    description: i18n.t('seoDescription'),
}
