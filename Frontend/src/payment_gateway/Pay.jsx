import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import PaymentCard from './components/PaymentCard';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Audio , InfinitySpin } from 'react-loader-spinner'
function Pay() {
  const url = import.meta.env.VITE_BACKEND_URL;
  const razorpayKey = import.meta.env.VITE_KEY_ID;
  const navigate = useNavigate()
  const [isloading, SetisLoading] = useState(false)
  const { userId, isSignedIn } = useAuth();
  const handlePayment = async () => {

    if (!isSignedIn || !userId) {
      toast.warning("User not signed in.");
      return;
    }
    const order = await axios.post(`${url}/api/create-order`);

    const options = {
      key: razorpayKey, // Replace with your test key
      amount: 5000,
      currency: order.currency,
      order_id: order.id,
      name: 'Buy Access',
      handler: async (response) => {
        const paymentId = response.razorpay_payment_id;
        const orderId = response.razorpay_order_id;

        try {
          const res = await axios.get(`${url}/api/payment/${paymentId}`);
          const payment = res.data;

          if (payment.status === 'authorized') {
            SetisLoading(true)
            //change user status
            await axios.post(`${url}/api/mark-paid`, {
              clerkUserId: userId,
              orderId,
              paymentId,
            });

            SetisLoading(false)
            toast.success("You are now Premium User !", {
              position: "top-right"
            });

            // if (isloading == false) navigate("/")
          } else {
            toast.warning(`Payment failed or incomplete. Status: ${payment.status}`);
          }
        } catch (error) {
          console.error(error);
          toast.warning('Error verifying payment status.');
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

  };

  return (
    <div>
      <ToastContainer />
      {/* <InfinitySpin
  visible={true}
  width="200"
  color="#4fa94d"
  ariaLabel="infinity-spin-loading"
  /> */}
      <PaymentCard handlepayment={handlePayment} />
    </div>

  );
}

export default Pay;
