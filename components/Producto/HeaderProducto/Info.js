import React, { useState, useEffect } from 'react';
import { size } from "lodash";
import { Icon, Button } from "semantic-ui-react";
import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart";
import { TextField } from "@material-ui/core";
import "../../../locales/i18n";
import {
    isFavoriteApi,
    addFavoriteApi,
    removeFavoriteApi,
} from "../../../api/favorite";
import { toast } from 'react-toastify';

export default function Info(props) {
    const { producto, t } = props;
    const { title, summary, price, discount, url } = producto;
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [reloadFavorite, setReloadFavorite] = useState(false);
    const { auth, logout } = useAuth();
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
            await addFavoriteApi(auth.idUser, producto.id, logout);
            setReloadFavorite(true);
        } else {
            toast.error(t('productoHeaderAddCartLogoff'))
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
        } else {
            toast.error(t('productoHeaderAddCartLogoff'))
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
                { title }
                <Icon
                    name={ isFavorite ? "heart red" : "heart outline" }
                    link
                    loading={ loading }
                    onClick={ isFavorite ? removeFavorite : addFavorite }
                />
            </div>
            <div className="header-producto__delivery">{ t('productoHeaderProductoDelivery24') }</div>
            <div className="header-producto__summary" dangerouslySetInnerHTML={ { __html: summary } } />
            <div className="header-producto__quantity">
                <TextField
                    id="outlined-number"
                    label={ t('productoHeaderProductoQuantity') }
                    type="number"
                    size="small"
                    InputLabelProps={ {
                        shrink: true,
                    } }
                    onChange={ (e) => changeQuantity(e) }
                    value={ quantity }
                    variant="outlined"
                />
            </div>
            <div className="header-producto__buy">
                <div className="header-producto__buy-price">
                    <p>
                        <Icon name="tag" />{ t('productoHeaderProductoSalesPrice') }
                        <p className={ classPrice() }>${ price }</p>
                    </p>
                    <div className="header-producto__buy-price-actions">
                        { discount && (
                            <>
                                <p>-{ discount }%</p>
                                <p>${ (price - Math.floor(price * discount) / 100).toFixed(2) }</p>
                            </>
                        ) }
                    </div>
                </div>

                <Button
                    className="header-producto__buy-btn"
                    onClick={ () => addProd() }>
                    { t('productoHeaderProductoAddToCart') }
                </Button>
            </div>
        </>
    )
}