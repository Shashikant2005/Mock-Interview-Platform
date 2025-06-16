import axios from 'axios';

function Pay({ userId }) {
  const razorpayKey = "rzp_test_VMdp7XzRXQ4fgQ";
  // const { user } = useUser(); // Clerk user object
  // const clerkUserId = user?.id;
  const clerkUserId = "user_2xfp8Y5okQaDxhMvHvMjumbYzDF"
  const handlePayment = async () => {

    //   if (!isSignedIn || !user?.id) {
    //   alert("❌ User not signed in.");
    //   return;
    // }
    const order = await axios.post('http://localhost:3000/api/create-order');

    const options = {
      key: razorpayKey, // Replace with your test key
      amount: order.amount,
      currency: order.currency,
      order_id: order.id,
      name: 'Buy Access',
      handler: async (response) => {
        const paymentId = response.razorpay_payment_id;
        const orderId = response.razorpay_order_id;

        try {
          const res = await axios.get(`http://localhost:3000/api/payment/${paymentId}`);
          const payment = res.data;

          if (payment.status === 'authorized') {
            //change user status
            await axios.post('http://localhost:3000/api/mark-paid', {
              clerkUserId,
              orderId,
              paymentId,
            });

             alert('✅ You are now a premium user!');
          } else {
            alert(`⚠️ Payment failed or incomplete. Status: ${payment.status}`);
          }
        } catch (error) {
          console.error(error);
          alert('❌ Error verifying payment status.');
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

  };

  return <button onClick={handlePayment}>Buy Access : </button>;
}

export default Pay;
