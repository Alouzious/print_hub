import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';
import { useState } from 'react';

export default function PaymentButton({ amount, onPaymentSuccess }) {
  // Generate a unique reference ONCE when component mounts
  const [txRef] = useState(() => 'printhub-' + Date.now());
  
  const handleCallback = (response) => {
    if (response.status === 'successful') {
      onPaymentSuccess(response.transaction_id);
    }
    closePaymentModal();
  };

  const config = {
    public_key: 'FLWPUBK_TEST-e5d6239e4af8ea6da9132c8d1fff6eb1-X', // Replace with your actual test key
    tx_ref: txRef,
    amount: amount,
    currency: 'UGX',
    payment_options: 'card,mobilemoneyuganda',
    customer: {
      email: '2025akcs5797f@kab.ac.ug',
      name: 'Ahumuza John Baptist',
    },
    customizations: {
      title: 'PrintHub Payment',
      description: 'Payment for printing services',
      logo: 'https://yourlogo.com/logo.png',
    },
  };

  return (
    <FlutterWaveButton 
      {...config}
      text={'Pay UGX ' + amount.toLocaleString()}
      callback={handleCallback}
      onClose={() => {}}
      className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 font-semibold" 
    />
  );
}