import React from "react";
import Link from "next/link";
import { numToDollar } from "../../utils/util";
import { URL_ERROR_PLACEHOLDER } from "../../utils/constants";

export default function HeaderProducts({ producto }) {

    return (
        <div>
            <Link href={ `/${producto.url}` }>
                <img
                    alt={ producto.title }
                    height="200px"
                    src={ producto.poster.url }
                    onError={ (e) => e.target.src = URL_ERROR_PLACEHOLDER } />
            </Link>
            { producto.discount && (
                <div className="p-discount">
                    <p>
                        -{ producto.discount }% - <span>{ numToDollar(producto.price) }</span>
                    </p>
                </div>
            ) }
        </div>
    );
}