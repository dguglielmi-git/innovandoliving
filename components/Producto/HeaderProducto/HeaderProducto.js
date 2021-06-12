import React, { useState, useEffect } from 'react';
import { Grid, Image, Icon, Button } from "semantic-ui-react";
import { size } from "lodash";
import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart";
import {
    isFavoriteApi,
    addFavoriteApi,
    removeFavoriteApi,
} from "../../../api/favorite";
import { useTranslation } from "react-i18next";
import { TextField } from "@material-ui/core";
import "../../../locales/i18n";

export default function HeaderProducto(props) {
    const { producto } = props;
    const { t } = useTranslation();
    const { poster, title } = producto;

    return (
        <Grid className="header-producto">
            <Grid.Column mobile={16} tablet={6} computer={6}>
                <div className="header-producto__image">
                    <Image src={poster.url} alt={title} />
                </div>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={10} computer={10}>
                <Info producto={producto} t={t} />
            </Grid.Column>
        </Grid>
    )
}

function Info(props) {
    const { producto, t } = props;
    const { title, summary, price, discount, url } = producto;
    const [isFavorite, setIsFavorite] = useState(false);
    const [reloadFavorite, setReloadFavorite] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const { auth, logout } = useAuth();
    const [loading, setLoading] = useState(false);
    const { addProductCart } = useCart();

    useEffect(() => {
        (async () => {
            if (auth) {
                const response = await isFavoriteApi(auth.idUser, producto.id, logout);
                if (size(response) > 0) setIsFavorite(true);
                else setIsFavorite(false);
            }
        })();
        setReloadFavorite(false);
    }, [producto, reloadFavorite]);

    const addFavorite = async () => {
        if (auth) {
            setLoading(true);
            // If the user is logged, we can add to favorites
            await addFavoriteApi(auth.idUser, producto.id, logout);
            setReloadFavorite(true);
        }
        setLoading(false);
    }

    const removeFavorite = async () => {
        if (auth) {
            setLoading(true);
            await removeFavoriteApi(auth.idUser, producto.id, logout);
            setReloadFavorite(true);
        }
        setLoading(false);
    }

    const addProd = async () => {
        if (auth) {
            await addProductCart(auth.idUser, producto._id, quantity);
        }
    }

    const changeQuantity = (e) => {
        setQuantity(e.target.value);
    }
    const classPrice = () => {
        return discount ? 'header-producto__discount' : 'header-producto__normal-price';
    }

    return (
        <>
            <div className="header-producto__title">
                {title}
                <Icon
                    name={isFavorite ? "heart red" : "heart outline"}
                    link
                    loading={loading}
                    onClick={isFavorite ? removeFavorite : addFavorite}
                />
            </div>
            <div className="header-producto__delivery">{t('productoHeaderProductoDelivery24')}</div>
            <div className="header-producto__summary" dangerouslySetInnerHTML={{ __html: summary }} />
            <div className="header-producto__quantity">
                <TextField
                    id="outlined-number"
                    label={t('productoHeaderProductoQuantity')}
                    type="number"
                    size="small"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(e) => changeQuantity(e)}
                    value={quantity}
                    variant="outlined"
                />
            </div>
            <div className="header-producto__buy">
                <div className="header-producto__buy-price">
                    <p>
                        <Icon name="tag" />{t('productoHeaderProductoSalesPrice')}
                        <p className={classPrice()}>${price}</p>
                    </p>
                    <div className="header-producto__buy-price-actions">
                        {discount && (
                            <>
                                <p>-{discount}%</p>
                                <p>${(price - Math.floor(price * discount) / 100).toFixed(2)}</p>
                            </>
                        )}
                    </div>
                </div>

                <Button
                    className="header-producto__buy-btn"
                    onClick={() => addProd()}>
                    {t('productoHeaderProductoAddToCart')}
                </Button>
            </div>
        </>
    )
}