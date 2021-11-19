import React, { useEffect } from "react";
import Typography from '@material-ui/core/Typography';
import { Container, Divider } from "semantic-ui-react";
import { Timeline } from 'primereact/timeline';
import { Icon } from "semantic-ui-react";
import Comments from "./Comments";
import ItemsTable from "./ItemsTable";
import { formatDate, translateStatus, drawOrderProgress } from "../../../../utils/util";
import { markMessageAsRead } from "../../../../api/orderMessage";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function OrderDetails(props) {
    const { setShowDetail, order, setReloadOrder } = props;

    const goBack = () => setShowDetail(false);

    useEffect(() => {
        (async () => {
            if (order) {
                const result = await markMessageAsRead(order._id)
                console.log(result);
                setReloadOrder(true);
            }
        })()
    },[])

    const ButtonBack = () => (
        <div className="order-detail__mainbox-buttonback" onClick={ () => goBack() }>
            <Icon name='arrow alternate circle left' color="blue" size='big' />
            <h6>Volver</h6>
        </div>
    );

    return (
        <div className="order-detail__mainbox">
            <ButtonBack />
            <div className="order-detail__mainbox-title">
                <div>
                    <Typography variant="caption" display="block gutterBottom">
                        <strong>Orden #:</strong> { order.mercadoPagoMerchantOrderId }
                    </Typography>
                </div>
                <div>
                    <Typography variant="caption" display="block gutterBottom">
                        <strong>Fecha de Orden:</strong> { formatDate(order.dateCreated) }
                    </Typography>
                </div>
                <div>
                    <Typography variant="caption" display="block gutterBottom">
                        <strong>Estado:</strong> { translateStatus(order.status) }
                    </Typography>
                </div>
            </div>

            <div className="order-detail__mainbox-orderstatus">
                <h5>Progreso de la Orden</h5>
                <div className="order-detail__mainbox-timeline">
                    <Timeline value={ drawOrderProgress(order.status) } content={ (item) => item.status } />
                </div>
            </div>

            <div className="order-detail__mainbox-items">
                <div className="order-detail__mainbox-items-details">
                    <ItemsTable items={ order.items } />
                </div>
                <div className="order-detail__mainbox-items-summary">
                    { /* Here are the total cost and summary of the list*/ }
                </div>
            </div>

            <div className="order-detail__mainbox-goback">

            </div>

            <Divider section />

            <div className="order-detail__mainbox-comments">
                <Container>
                    <Comments
                        order={ order }
                        setReloadOrder={ setReloadOrder } />
                </Container>
            </div>




        </div>
    )
}