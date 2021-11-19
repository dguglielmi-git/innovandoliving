export const STRIPE_TOKEN = "pk_test_51Ix2YOB5rkumZ3Y6Z6GmYioPNzbjpEWgJdSRFnws96O5f0MSiAOMghdepZ6bBqg2jFA3xMdch4u6RSMMU9u47qnt00lQ5e3kzF";
export const CART = "cart";
export const TOKEN = "token";
export const SERVER_ADDRESS = process.env.NODE_ENV === 'test' ? '' : "http://eqfam:1337";
export const URL_MERCADOPAGO_BACKEND = process.env.NODE_ENV === 'test' ? '' : "http://eqfam:5000/api/mercadopago"
export const ORDER_PROCESSED = 0;
export const ORDER_AWAITING_SHIPMENT = 1;
export const ORDER_ON_THE_WAY = 2;
export const ORDER_DELIVERED = 3;
export const ORDER_DELIVERY_NOT_POSSIBLE = 4;
export const ORDER_CANCELLED = 5;
export const ORDER_DECLINED = 6;
export const ORDER_REFUNDED = 7;
export const ORDER_DISPUTED = 8;
export const ORDER_PARTIALLY_REFUNDED = 9;
export const ORDER_AWAITING_PICKUP = 10;
export const ORDER_PARTIALLY_SHIPPPED = 11;