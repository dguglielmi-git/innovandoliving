import React from "react";
import Typography from '@material-ui/core/Typography';
import { Timeline } from 'primereact/timeline';
import ItemsTable from "./ItemsTable";
import Comments from "./Comments";
import { Container, Divider } from "semantic-ui-react";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function OrderDetails(props) {

    const events1 = [
        {
            status: 'Ordered',
            date: '15/10/2020 10:30',
            icon: 'pi pi-shopping-cart',
            color: '#9C27B0',
            image: 'game-controller.jpg'
        },
        {
            status: 'Processing',
            date: '15/10/2020 14:00',
            icon: 'pi pi-cog',
            color: 'red'
        },
        { status: 'Shipped', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
        { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' }
    ];

    return (
        <div className="order-detail__mainbox">
            <div className="order-detail__mainbox-title">
                <div>
                    <Typography variant="caption" display="block gutterBottom">
                        <strong>Orden #:</strong> 23092093
                    </Typography>
                </div>
                <div>
                    <Typography variant="caption" display="block gutterBottom">
                        <strong>Fecha de Orden:</strong> 10/10/2021
                    </Typography>
                </div>
                <div>
                    <Typography variant="caption" display="block gutterBottom">
                        <strong>Estado:</strong> Pendiente
                    </Typography>
                </div>
            </div>

            <div className="order-detail__mainbox-orderstatus">
                <h5>Estado de la Orden</h5>
                <div className="order-detail__mainbox-timeline">
                    <Timeline value={ events1 } content={ (item) => item.status } />
                </div>
            </div>

            <div className="order-detail__mainbox-items">
                <div className="order-detail__mainbox-items-details">
                    <ItemsTable />
                </div>
                <div className="order-detail__mainbox-items-summary">
                    { /* Here are the total cost and summary of the list*/ }
                </div>
            </div>

            <Divider section />

            <div className="order-detail__mainbox-comments">
                <Container>
                    <Comments />
                </Container>
            </div>

            <div className="order-detail__mainbox-goback">

            </div>


        </div>
    )
}