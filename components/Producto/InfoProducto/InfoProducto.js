import React from 'react';
import { size } from "lodash";
import moment from "moment";
import { useTranslation } from "react-i18next";
import CarouselScreenshots from "../CarouselScreenshots";
import "moment/locale/es";
import "../../../locales/i18n";


export default function InfoProducto(props) {
    const { producto } = props;
    const { t } = useTranslation();

    return (
        <div className="info-producto">
            { (size(producto.screenshots) > 1) &&
                <CarouselScreenshots
                    title={ producto.title }
                    screenshots={ producto.screenshots }

                /> }

            <div className="info-producto__content">
                <div className="info-producto__content-date">
                    <h4>{ t('productoInfoProductoReleaseDate') }</h4>
                    <p>{ moment(producto.releaseDate).format("LL") }</p>
                </div>
            </div>
        </div>
    )
}
