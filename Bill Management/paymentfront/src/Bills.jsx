import React, { useState } from "react";
import {
  ChakraProvider,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Card,
  CardBody,
  CardFooter,
  Select,
  Heading,
  Radio,
  RadioGroup,
  Flex
} from "@chakra-ui/react";

import { MdPayment } from "react-icons/md";
import { BsBank } from "react-icons/bs";
import { RiVisaFill } from "react-icons/ri";
import {FaCcMastercard} from "react-icons/fa";

const Bill = () => {

  const [selectedPaymentOption, setSelectedPaymentOption] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");

  const handlePaymentOptionChange = (value) => {
    setSelectedPaymentOption(value);
  };

  const handlePaymentSubmit = () => {
    // Handle the payment submission based on the selected payment option and form data
    console.log("Payment Option: ", selectedPaymentOption);
    console.log("Card Number: ", cardNumber);
    console.log("Phone Number: ", phoneNumber);
    console.log("Amount: ", amount);
  };

  return (
    <ChakraProvider>
      <SimpleGrid columns={3} spacing={60} ml={60} mt={10} p={10}>
        <Card
          bgColor="gray.100"
          onClick={() => setSelectedPaymentOption("bank")}
        >
          <CardBody pl={20}>
            <BsBank size={40} />
          </CardBody>
          <CardFooter pl={20} bgColor="green.100">
            <b>Rewords</b>
          </CardFooter>
        </Card>
        <Card
          bgColor="gray.100"
          onClick={() => setSelectedPaymentOption("creditCard")}
        >
          <CardBody pl={20}>
            <MdPayment size={60} />
          </CardBody>
          <CardFooter pl={20} bgColor="green.100">
            <b>Credit Card</b>
          </CardFooter>
        </Card>
      </SimpleGrid>

      <Box mt={10} ml={40} p={10} width="80%" bgColor="white">
        {selectedPaymentOption === "bank" && (
          <FormControl>
            <Heading>Phone Bill Payment</Heading>
            <br />
            <FormLabel>Select Service Provider:</FormLabel>
            <br />
            <Select placeholder="Select option">
              <option value="Mobitel">Mobitel</option>
            </Select>
            <br />
            <FormLabel>NIC:</FormLabel>
            <Input type="text" placeholder="NIC" /> <br />
            <br />
            <FormLabel>Enter Phone Number</FormLabel>
            <Input type="number" placeholder="Number" /> <br />
            <br />
            <FormLabel>Amount(LKR)</FormLabel>
            <br />
            <Input type="number" placeholder="Amount" /> <br />
            <Button colorScheme="blue" ml={40}  mt ={5} onClick={handlePaymentSubmit} w={60}>
              Get Reword
            </Button>
          </FormControl>
        )}

        {selectedPaymentOption === "creditCard" && (
          <FormControl>
             <Heading>Phone Bill Payment</Heading>
            <br />
            <Box mt={10} ml={30} p={10} width="100%" bgColor="white">

        <RadioGroup value={selectedPaymentOption} onChange={handlePaymentOptionChange}>
  <FormControl as="fieldset" w={80}>
    <FormLabel as="legend" mb={2}>
      Select payment option:
    </FormLabel>
    <Flex align="center" direction="row">
      <Radio value="visa" w={40} mb={2}>
        <Flex align="left" direction="row" gap ={5}>
        Visa
        <RiVisaFill size={40}  />
        </Flex>
      </Radio>
      
      <Radio value="masterCard" mb={2}>
        <Flex align="left" direction="row" gap ={5} >
            MasterCard
        <FaCcMastercard size={40} />
        
        </Flex>
      </Radio>
    </Flex>
  </FormControl>
</RadioGroup><br/>


        <FormControl>
          <FormLabel>Enter Card Number</FormLabel>
          <Input
            type="text"
            placeholder="Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
        </FormControl><br/>
        <FormControl>
            <Flex align="center" direction="row" gap ={5}>
            <FormLabel w={40}>Enter Expiry Date</FormLabel>
            <Input type="date" placeholder="Expiry Date" w={80} />
            <FormLabel w={20}>Enter CVV</FormLabel>
            <Input type="number" placeholder="CVV" w={80}  />

</Flex>

        </FormControl>
        
        <br />
            <FormLabel>Select Service Provider:</FormLabel>
            <br />
            <Select placeholder="Select option">
              <option value="Mobitel">Mobitel</option>
            </Select>
            <br />

        <FormControl>
          <FormLabel>Enter Phone Number</FormLabel>
          <Input
            type="number"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </FormControl><br/>

        <FormControl>
          <FormLabel>Amount</FormLabel>
          <Input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </FormControl><br/>

        <Button colorScheme="blue" ml={40}  mt ={5} onClick={handlePaymentSubmit} w={60}>
          Pay Bill
        </Button>
      </Box>
          </FormControl>
        )}
      </Box>
    </ChakraProvider>
  );
};

export default Bill;
