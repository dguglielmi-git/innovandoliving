export const BUSINESS_NAME = "InnovandoLiving";
export const CART = "cart";
export const TOKEN = "token";
export const CORS_PROXY =
  process.env.NODE_ENV == "development"
    ? // "https://cors-anywhere.herokuapp.com/"
      "https://cors-proxy.htmldriven.com/?url="
    : "";

export const URL_ERROR_PLACEHOLDER =
  "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png";

export const IS_OWNER = 1;
export const IS_NORMAL_USER = 0;
export const USER_OWNER = "owner";
export const USER_CLIENT = "client";
export const NOT_FOUND = "Not Found";

export const DEFAULT_LIMIT_MAIN_PRODUCTS = 50;
export const DEFAULT_SORT_PRODUCT_ITEMS =
  "sort=createAt:-1&publish=true&limit=";
export const FILTER_PRODUCTS_BY_PLATFORM = "sort=createAt:-1&skip=";
export const FILTER_SORTED_PLATFORMS = "sort=position:-1";

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

export const ORDER_ORDERED = 0;
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
export const PAYMENT_METHOD_MERCADOPAGO = "mercadopago";
export const PAYMENT_METHOD_CASH_AND_CARD = "cashandcard";

export const DELIVERY_OPTION_TBD = "tbd";
export const DELIVERY_OPTION_STORE = "store";
export const DELIVERY_OPTION_DELIVERY = "delivery";
export const DELIVERY_OPTION_EXTERNAL_PROVIDER = "deliveryExternal";

export const ERROR_GETTING_ADDRESS_DETAILS =
  "An Error happened when trying to get the Address details:";
export const ERROR_NOT_VALID_ADDRESS = "Not a valid Address received:";
export const TOKEN_IS_MISSING =
  "Token is missing, please provide a valid token in the request.";
export const ALREADY_IN_FAVORITES = "Item is already a favorite";
export const ITEM_NOT_ADDED_TO_FAVORITES =
  "Server could not add the item to favorites. detail:";
export const ITEM_ADDED_TO_FAVORITES = "Item Added to favorites";
export const ITEM_REMOVED_FROM_FAVORITES =
  "Item was successfully removed from favorites";
export const ITEM_NOT_REMOVED =
  "Something went wrong when trying to removed the Item, Server status code: ";
export const ERROR_GETTING_DOCTYPES = "Error trying to get documents from the backend.";