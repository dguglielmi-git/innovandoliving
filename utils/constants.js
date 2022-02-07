export const CART = "cart";
export const TOKEN = "token";
export const CORS_PROXY = process.env.NODE_ENV == "development" ? "https://cors-anywhere.herokuapp.com/" : '';
export const SERVER_ADDRESS = process.env.NODE_ENV === 'test' ? '' : "http://eqfam:1337";
export const URL_MERCADOPAGO_BACKEND = process.env.NODE_ENV === 'test' ? '' : "http://eqfam:5000/api/mercadopago"
export const REFRESH_SYSTEM_DATA = 15000;

export const ORIGIN_DELIVERY_ADDRESS = "Deán Funes 3920, B1826EYI Lanús, Provincia de Buenos Aires, Argentina";
export const GOOGLE_MAPS_GEOCODE_URL = "https://maps.googleapis.com/maps/api/geocode/json?";
export const GOOGLE_MAPS_DISTANCE_MATRIX_URL = "https://maps.googleapis.com/maps/api/distancematrix/json?";
export const URL_ERROR_PLACEHOLDER = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png';

export const IS_OWNER = 1;
export const IS_NORMAL_USER = 0;
export const USER_OWNER = "owner";
export const USER_CLIENT = "client";
export const NOT_FOUND = "Not Found"

export const STEP_VERIFY_PRODUCTS = 0;
export const STEP_DELIVERY_OPTIONS = 1;
export const STEP_CONFIRM_ORDER = 2;
export const STEP_PAY_ORDER = 3;
export const STEP_FINISH_ORDER = 4;
export const STEP_CASH_AND_CARD = 5;

export const PATH_LOGO_IMG = "logo.png";
export const PATH_FAILURE_IMG = "failure.png";
export const PATH_PENDING_IMG = "pending.png";
export const PATH_SUCCESS_IMG = "success.png";
export const PATH_DELIVERY_IMG = "delivery.png";

export const COMPUTER_COL_SIZE = 4;
export const TABLET_COL_SIZE = 8;
export const MOBILE_COL_SIZE = 16;

export const ORDER_PENDING_PAYMENT = 12;
export const ORDER_CLOSED = 99;

export const LINK_TO_CART = "/cart";
export const LINK_TO_ORDERS = "/orders";
export const LINK_TO_ACCOUNT = "/account";
export const LINK_TO_WISHLIST = "/wishlist";
export const LINK_TO_SHOWROOM = "/showroom";
export const LINK_TO_QUESTIONS = "/queries";

export const PAYMENT_METHOD_CASH = "cash";
export const PAYMENT_METHOD_CREDIT_CARD = "creditcard";
export const PAYMENT_METHOD_CASH_AND_CARD = "cashandcard";

export const DELIVERY_OPTION_STORE = 'store';
export const DELIVERY_OPTION_TBD = 'tbd';
export const DELIVERY_OPTION_DELIVERY = 'delivery';
export const DELIVERY_OPTION_EXTERNAL_PROVIDER = 'deliveryExternal';