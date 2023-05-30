
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
        mercadoPagoPaymentId: payment_id,
        mercadoPagoPaymentType: payment_type,
        mercadoPagoMerchantOrderId: merchant_order_id,
        mercadoPagoProcessingMode: processing_mode,
    }
}

export const parsePendingFinalOrder = async (data) => {
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
        mercadoPagoPaymentId: payment_id,
        mercadoPagoPaymentType: payment_type,
        mercadoPagoMerchantOrderId: merchant_order_id,
        mercadoPagoProcessingMode: processing_mode,
    }
}
