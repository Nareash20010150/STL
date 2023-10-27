import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import {
  Input,
  FormLabel,
  Heading,
  ChakraProvider,
  Box,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";

const Payment = () => {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [amountToSend, setAmountToSend] = useState(1000);
  const [number, setNumber] = useState("");
  const amount = amountToSend*100
  console.log(amount)

  const [userDetails, setuserDetails] = useState('');

//getting information from the userServices
useEffect(() => {
  axios.get('http://localhost:6001/api/user";')
    .then(response => {
      setuserDetails(response.data.message);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}, []);

const userId = userDetails.user_id;

  useEffect(() => {
    fetch("/config").then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    // Fetch clientSecret using the dynamic amountToSend
    fetch(`/create-payment-intent?amount=${amount}`, {
      method: "POST",
      body: JSON.stringify({}),
    }).then(async (result) => {
      var { clientSecret } = await result.json();
      setClientSecret(clientSecret);
    });
  }, [amountToSend]);

  useEffect(() => {
    // Fetch clientSecret using the dynamic amountToSend and user number

    fetch(`/payment?amount=${amount}&userId=${userId}`, {
      method: "POST",
      body: JSON.stringify({}),
    }).then(async (result) => {
      var { clientSecret } = await result.json();
      setClientSecret(clientSecret);
    } );

  },[amountToSend,userId]);

  const handleAmountChange = (e) => {
    setAmountToSend(e.target.value); // Update the amount when the user changes it
  };

  const handleNumberChange = (e) => {
    setNumber(e.target.value); // Update the amount when the user changes it
  };

  return (
    <Box
      w="50%"
      mt="8%"
      ml="25%"
      p={10}
      border= "5px solid #100c08" // Add a border
      padding="100px" // Add padding for spacing
      borderRadius="10px" // Add rounded corners
    >
      <ChakraProvider>
        <Heading>Pay your Bills here</Heading>
        <div>
          <FormLabel>Add your Number /Account: </FormLabel>
          <Input
            type="text"
            value={number}
            onChange={handleNumberChange}
            height="50px" // Increase the height
          />
          <FormLabel>Amount to Send:</FormLabel>
          <Input
            type="number"
            value={amountToSend}
            onChange={handleAmountChange}
            height="50px" // Increase the height
          />
        </div>
      </ChakraProvider>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
     <Link to = "/billPayment"><Button style = {{backgroundColor :"#4794eb"  , padding:"15px", minWidth: "20%" ,
      borderRadius :"5px" ,marginTop:"-12%" , marginLeft:"-80%" , color:"whitesmoke"}}>Back</Button></Link> 
    </Box>
  );
};

export default Payment;
