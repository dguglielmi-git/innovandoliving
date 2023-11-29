import React, { useMemo, useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
import PrimeReact from 'primereact/api'
import { Provider } from 'react-redux'
import store from '../redux/stores/main'
import { useRouter } from 'next/router'
import { faCoffee, faCheckSquare } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next'
import { ToastContainer, toast } from 'react-toastify'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import AuthContext from '../context/AuthContext'
import CartContext from '../context/CartContext'
import MsgsContext from '../context/MsgsContext'
import MyLivingContext from '../context/LivingContext'
import SettingsContext from '../context/SettingsContext'
import {
  getCart,
  cleanCart,
  addToCart,
  removeItemCart,
  countProductsCart
} from '../api/cart'
import { getUnreadMsgs } from '../api/producto'
import { getConfigurations } from '../api/configurations'
import { setToken, getToken, removeToken } from '../api/token'
import '../locales/i18n'
import '../scss/global.scss'
import 'primeicons/primeicons.css'
import 'slick-carousel/slick/slick.css'
import 'semantic-ui-css/semantic.min.css'
import 'primereact/resources/primereact.css'
import 'slick-carousel/slick/slick-theme.css'
import 'react-toastify/dist/ReactToastify.css'
import 'primereact/resources/primereact.min.css'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

PrimeReact.ripple = true

export default function MyApp ({ Component, pageProps }) {
  const router = useRouter()
  const { t } = useTranslation()
  const [auth, setAuth] = useState(undefined)
  const [reloadUser, setReloadUser] = useState(false)
  const [reloadCart, setReloadCart] = useState(false)
  const [queryCounter, setQueryCounter] = useState(0)
  const [ordersCounter, setOrdersCounter] = useState(0)
  const [reloadMsgCounter, setReloadMsgCounter] = useState(false)
  const [configs, setConfigs] = useState(undefined)
  const [totalProductsCart, setTotalProductsCart] = useState(0)

  library.add(fab, faCheckSquare, faCoffee)

  const setConfigurations = async () => {
    const conf = await getConfigurations()
    setConfigs(conf)
  }
  useEffect(() => {
    const token = getToken()
    if (token) {
      setAuth({
        token,
        idUser: jwtDecode(token).id
      })
    } else {
      setAuth(null)
    }
    setConfigurations()
    setReloadUser(false)
  }, [reloadUser])

  useEffect(() => {
    if (auth) {
      setTotalProductsCart(countProductsCart())
    }
    setReloadCart(false)
  }, [reloadCart, auth])

  useEffect(() => {
    const interval = setInterval(async () => {
      setReloadMsgCounter(true)
    }, process.env.NEXT_PUBLIC_REFRESH_SYSTEM_DATA)
    return () => clearInterval(interval)
  }, [])

  const setOrderCounters = async () => {
    const counters = await getUnreadMsgs()
    const { queryCounter: qCounter, ordersCounter: oCounter } = await counters
    if (qCounter !== queryCounter) {
      setQueryCounter(qCounter)
    }
    if (oCounter !== ordersCounter) {
      setOrdersCounter(oCounter)
    }
    setReloadMsgCounter(false)
  }

  useEffect(() => {
    if (auth) {
      setOrderCounters()
    }
  }, [reloadMsgCounter])

  const login = token => {
    setToken(token)
    setAuth({
      token,
      idUser: jwtDecode(token).id
    })
  }

  const logout = () => {
    if (auth) {
      router.push('/')
      removeToken()
      setAuth(null)
    }
  }

  const addProduct = async (idUser, product, quantity) => {
    const token = getToken()
    if (token) {
      await addToCart(idUser, product, quantity, logout)
      setReloadCart(true)
    } else {
      toast.warning(t('appAddProduct'))
    }
  }

  const removeProduct = product => {
    removeItemCart(product, logout)
    setReloadCart(true)
  }

  const cleaningCart = async logout => {
    await cleanCart(logout)
    setTotalProductsCart(0)
  }

  const settingsData = useMemo(
    () => ({
      configs
    }),
    [configs]
  )

  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
      setReloadUser
    }),
    [auth]
  )

  const msgsData = useMemo(
    () => ({
      queryCounter: queryCounter,
      ordersCounter: ordersCounter,
      setReloadMsgCounter
    }),
    [queryCounter, ordersCounter]
  )

  const cartData = useMemo(
    () => ({
      productsCart: totalProductsCart,
      addProductCart: (idUser, product, quantity) =>
        addProduct(idUser, product, quantity),
      getProductsCart: getCart,
      removeProductCart: product => removeProduct(product),
      cleanCart: () => cleaningCart(logout)
    }),
    [totalProductsCart]
  )

  if (auth === undefined) return null

  return (
    <Provider store={store}>
      <MsgsContext.Provider value={msgsData}>
        <SettingsContext.Provider value={settingsData}>
          <AuthContext.Provider value={authData}>
            <CartContext.Provider value={cartData}>
              <MyLivingContext>
                <Component {...pageProps} />
                <ToastContainer
                  position='top-right'
                  autoClose={5000}
                  hideProgressBar
                  newestOnTop
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss={false}
                  draggable
                  pauseOnHover
                />
              </MyLivingContext>
            </CartContext.Provider>
          </AuthContext.Provider>
        </SettingsContext.Provider>
      </MsgsContext.Provider>
    </Provider>
  )
}
