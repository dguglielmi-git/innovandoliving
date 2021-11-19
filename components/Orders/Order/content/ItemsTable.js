import React, { useState, useEffect } from 'react';
import { size } from "lodash";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getTotalItems, numToDollar } from '../../../../utils/util';

const ItemsTable = (props) => {
    const { items } = props;
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(items)
    }, []);

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    const imageBodyTemplate = (rowData) => {
        return <img src={ rowData.image }
            onError={ (e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png' } alt={ rowData.image } className="product-image" />;
    }

    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.unit_price);
    }

    const totalPriceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.unit_price * rowData.quantity)
    }

    const header = (
        <div className="table-header">
            Items incluidos en la orden
        </div>
    );

    const footer = `Items en la orden: [ ${products ? products.length : 0} ]
    - Total: ${numToDollar(getTotalItems(items))}`;

    return (
        <div className="datatable-templating-demo">
            <div className="card">
                <DataTable value={ products } header={ header } footer={ footer }>
                    <Column header="Imagen" body={ imageBodyTemplate }></Column>
                    <Column field="title" header="Item"></Column>
                    <Column field="quantity" header="Cantidad"></Column>
                    <Column field="price" header="Precio" body={ priceBodyTemplate }></Column>
                    <Column field="totalprice" header="Total" body={ totalPriceBodyTemplate }></Column>
                </DataTable>
            </div>
        </div>
    );
}
export default ItemsTable;
