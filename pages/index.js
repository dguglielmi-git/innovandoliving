import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { size } from "lodash";
import BasicLayout from "../layouts/BasicLayout";
import { getLastProductosApi } from "../api/producto";
import { useTranslation } from "react-i18next";
import ListProductos from "../components/ListProductos";
import Seo from "../components/Seo";
import Footer from "../components/Footer/Footer";
import "../locales/i18n";

export default function Home() {
  const { t } = useTranslation();
  const [productos, setProductos] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getLastProductosApi(50);
      if (size(response) > 0) setProductos(response);
      else setProductos([]);
    })()
  }, []);

  return (
    <BasicLayout className="home">
      <Seo title="InnovandoLiving" />
      { !productos && <Loader active>{ t('indexLoadingProducts') }</Loader> }
      { productos && size(productos) === 0 && (
        <div>
          <h3>{ t('indexNotProductFound') }</h3>
        </div>
      ) }
      { size(productos) > 0 && (
        <>
          <h2>{ t('indexMainTitle') }</h2>
          <ListProductos productos={ productos } />
        </>
      ) }
      <Footer />

    </BasicLayout>
  );
}
