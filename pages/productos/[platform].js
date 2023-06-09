import React, { useState, useEffect } from "react";
import { size } from "lodash";
import { useRouter } from "next/router";
import { Loader } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import Footer from "../../components/Footer/Footer";
import BasicLayout from "../../layouts/BasicLayout";
import Pagination from "../../components/Pagination";
import ListProductos from "../../components/ListProductos";
import { getProductsByPlatform } from "../../api/producto";
import "../../locales/i18n";

export default function Platform() {
  const { query } = useRouter();
  const { t } = useTranslation();
  const [productos, setProductos] = useState(null);
  const [totalProductos, setTotalProductos] = useState(null);

  const getStartItem = () => {
    const currentPages = parseInt(query.page);
    if (!query.page || currentPages === 1) return 0;
    else
      return (
        currentPages * process.env.NEXT_PUBLIC_LIMIT_PER_PAGE -
        process.env.NEXT_PUBLIC_LIMIT_PER_PAGE
      );
  };

  useEffect(() => {
    (async () => {
      let totalProds = 0;
      if (query.platform) {
        const response = await getProductsByPlatform(
          query.platform,
          process.env.NEXT_PUBLIC_LIMIT_PER_PAGE,
          getStartItem()
        );
        setProductos(response);
        totalProds = (await response?.length) || 0;
      }
      setTotalProductos(totalProds);
    })();
  }, [query]);

  return (
    <BasicLayout>
      {!productos && (
        <Loader active>{t("productosPlatformLoadingProds")}</Loader>
      )}

      {productos && size(productos) === 0 && (
        <div>
          <h3>{t("productosPlatformNotProductFound")}</h3>
        </div>
      )}

      {size(productos) > 0 && <ListProductos productos={productos} />}

      {totalProductos ? (
        <Pagination
          totalProductos={totalProductos}
          page={query.page ? parseInt(query.page) : 1}
          limitPerPage={process.env.NEXT_PUBLIC_LIMIT_PER_PAGE}
        />
      ) : null}

      <Footer />
    </BasicLayout>
  );
}
