
export const parseFinalOrder = async (data) => {
    const {
        collection_id,
        payment_id,
        status,
        payment_type,
        merchant_order_id,
        preference_id,
        processing_mode } = data || null;

    return {
        orderPreferenceId: preference_id,
        orderCollectorId: collection_id,
        mercadoPagoStatus: status,
        mercadoPagoPreferenceId: preference_id,
        mercadoPagoPaymentId: payment_id,
        mercadoPagoPaymetType: payment_type,
        mercadoPagoMerchantOrderId: merchant_order_id,
        mercadoPagoProcessingMode: processing_mode,
    }
}
