import { Types } from 'mongoose';
import SSLCommerzPayment from 'sslcommerz-lts';

export const SSLPaymentGateway = async (price: number) => {
  const store_id = 'test66d026d8e620d';
  const store_passwd = 'test66d026d8e620d@ssl';
  const is_live = false;
  const unique_tran_id = new Types.ObjectId().toString();

  const data = {
    total_amount: price,
    currency: 'BDT',
    tran_id: unique_tran_id, // use unique tran_id for each api call
    success_url: `http://localhost:5000/api/payment/success/${unique_tran_id}`,
    fail_url: `http://localhost:5000/api/payment/fail/${unique_tran_id}`,
    cancel_url: 'http://localhost:3030/cancel',
    ipn_url: 'http://localhost:3030/ipn',
    shipping_method: 'Courier',
    product_name: 'Computer.',
    product_category: 'Electronic',
    product_profile: 'general',
    cus_name: 'Customer Name',
    cus_email: 'customer@example.com',
    cus_add1: 'Dhaka',
    cus_add2: 'Dhaka',
    cus_city: 'Dhaka',
    cus_state: 'Dhaka',
    cus_postcode: '1000',
    cus_country: 'Bangladesh',
    cus_phone: '01711111111',
    cus_fax: '01711111111',
    ship_name: 'Customer Name',
    ship_add1: 'Dhaka',
    ship_add2: 'Dhaka',
    ship_city: 'Dhaka',
    ship_state: 'Dhaka',
    ship_postcode: 1000,
    ship_country: 'Bangladesh',
  };

  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  const url = await sslcz.init(data).then((apiResponse) => {
    // Redirect the user to payment gateway
    const GatewayPageURL = apiResponse.GatewayPageURL;
    return GatewayPageURL;
  });

  return { url, tranId: unique_tran_id };
};
