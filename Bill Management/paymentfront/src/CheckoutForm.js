import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";


export default function CheckoutForm(props) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const { error,paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/completion`,
      },
      redirect: "if_required",
    });
    if (error) {
      // Show error to your customer
      setMessage(error);
    }
    else if (paymentIntent && paymentIntent.status === "succeeded") {
      // The payment has been processed!
      setMessage("Payment status : " + paymentIntent.status+"Done");
    }
    else{
      setMessage("Payment status : " + paymentIntent.status+"Not Done");
    }

    setIsProcessing(false);
    
   

  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button style = {{backgroundColor :"#92E3A9"  , padding:"15px", minWidth: "20%" ,
      borderRadius :"5px" ,marginTop:"5%" , marginLeft:"80%" , color:"black"}} disabled={isProcessing || !stripe || !elements} id="submit" >
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
