import React from 'react';
import ReactPlayer from "react-player/lazy";
import { size } from "lodash";
import moment from "moment";
import "moment/locale/es";
import { useTranslation } from "react-i18next";
import CarouselScreenshots from "../CarouselScreenshots";
import "../../../locales/i18n";


export default function InfoProducto(props) {
    const { producto } = props;
    const { t } = useTranslation();

    return (
        <div className="info-producto">
            {/* agregar en ReactPlayer controls={true} para los controles*/}
            {/*<ReactPlayer
                className="info-producto__video"
                url="https://www.youtube.com/watch?v=kYXCHggWUJM" />
            
            */}
            {(size(producto.screenshots) > 1) &&
                <CarouselScreenshots
                    title={producto.title}
                    screenshots={producto.screenshots}

                />}

            <div className="info-producto__content">
                <div className="info-producto__content-date">
                    <h4>{t('productoInfoProductoReleaseDate')}</h4>
                    <p>{moment(producto.releaseDate).format("LL")}</p>
                </div>
            </div>
        </div>
    )
}
