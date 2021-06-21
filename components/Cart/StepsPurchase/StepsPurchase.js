import React from 'react';
import { Steps } from 'primereact/steps';

const StepsPurchase = (props) => {
    const { activeIndex } = props

    const items = [
        {
            label: 'Chequear Productos'
        },
        {
            label: 'Opción de Entrega'
        },
        {
            label: 'Confirmar Pedido'
        },
        {
            label: 'Abonar Compra'
        }
    ];

    return (
        <div className="steps-cart">
            <div className="card">
                <div className="card-title">
                    <h5>Progreso de Compra</h5>
                </div>
                <Steps activeIndex={activeIndex} model={items} />
            </div>
        </div>
    );
}
export default StepsPurchase;