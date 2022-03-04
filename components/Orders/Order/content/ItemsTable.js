import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getTotalItems, numToDollar } from '../../../../utils/util';
import { URL_ERROR_PLACEHOLDER } from '../../../../utils/constants';
import { useTranslation } from 'react-i18next';

const ItemsTable = (props) => {
    const { items } = props;
    const { t } = useTranslation();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(items)
    }, []);

    const formatCurrency = (value) =>
        value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });


    const imageBodyTemplate = (rowData) => {
        return <img src={ rowData.image }
            onError={ (e) => e.target.src = URL_ERROR_PLACEHOLDER }
            alt={ rowData.image }
            className="product-image" />;
    }

    const priceBodyTemplate = (rowData) =>
        formatCurrency(rowData.unit_price);

    const totalPriceBodyTemplate = (rowData) =>
        formatCurrency(rowData.unit_price * rowData.quantity)


    const header = (
        <div className="table-header">
            { t('itemsTableHeaderOfList') }
        </div>
    );

    const footer = `${t('cartSummaryCartTotalCart')}: ${numToDollar(getTotalItems(items))}`;

    return (
        <div className="items-table">
            <DataTable
                className="responsive-table"
                responsiveLayout="stack"
                breakpoint="960px"
                value={ products }
                header={ header }
                footer={ footer }>
                <Column header={ t('itemsTableImageHeader') } body={ imageBodyTemplate }></Column>
                <Column field="title" header={ t('itemsTableItemDescriptionHeader') }></Column>
                <Column field="quantity" header={ t('itemsTableQuantityHeader') }></Column>
                <Column field="price" header={ t('itemsTablePriceHeader') } body={ priceBodyTemplate }></Column>
                <Column field="totalprice" header={ t('itemsTableTotalPriceHeader') } body={ totalPriceBodyTemplate }></Column>
            </DataTable>
        </div>
    );
}
export default ItemsTable;
