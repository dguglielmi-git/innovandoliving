import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from './ProductService';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';

const DataTableTemplatingDemo = () => {
    const [products, setProducts] = useState([]);
    const productService = new ProductService();

    useEffect(() => {
        productService.getProductsSmall().then(data => setProducts(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    const imageBodyTemplate = (rowData) => {
        return <img src={ `showcase/demo/images/product/${rowData.image}` }
            onError={ (e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png' } alt={ rowData.image } className="product-image" />;
    }

    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    }

    const header = (
        <div className="table-header">
            Items incluidos en la orden
            <Button icon="pi pi-refresh" />
        </div>
    );
    const footer = `En total hay ${products ? products.length : 0} productos.`;

    return (
        <div className="datatable-templating-demo">
            <div className="card">
                <DataTable value={ products } header={ header } footer={ footer }>
                    <Column header="Image" body={ imageBodyTemplate }></Column>
                    <Column field="name" header="Item"></Column>
                    <Column field="quantity" header="Cantidad"></Column>
                    <Column field="price" header="Precio" body={ priceBodyTemplate }></Column>
                    <Column field="totalprice" header="Total" body={ priceBodyTemplate }></Column>
                </DataTable>
            </div>
        </div>
    );
}
export default DataTableTemplatingDemo;
