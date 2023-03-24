import { createContext } from "react"

const AuthContext = createContext({
    auth: undefined,
    isOwner: undefined,
    login: () => null,
    logout: () => null,
    setReloadUser: () => null
});

export default AuthContext;