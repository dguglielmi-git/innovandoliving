import { createContext } from "react";

const MsgsContext = createContext({
    queryCounter: 0,
    ordersCounter: 0,
    setReloadMsgCounter: () => null
});

export default MsgsContext;
