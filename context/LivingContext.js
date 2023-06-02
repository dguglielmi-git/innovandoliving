import { createContext, useState } from "react";

export const LivingContext = createContext();

const MyLivingContext = (props) => {

    const [addressInvoice, setAddressInvoice] = useState({});
    const [addressTransport, setAddressTransport] = useState({});

    return (
        <LivingContext.Provider value={ {
            addressInvoice,
            setAddressInvoice,
            addressTransport,
            setAddressTransport
        } }>
            { props.children }
        </LivingContext.Provider>
    )

}

export default MyLivingContext;