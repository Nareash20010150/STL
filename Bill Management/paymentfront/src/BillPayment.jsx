import React from "react";
import {
  ChakraProvider,
  Card,
  CardBody,
  CardFooter,
  SimpleGrid,
  Grid,
  GridItem,
  Heading,

} from "@chakra-ui/react";
import { PhoneIcon, RepeatClockIcon} from "@chakra-ui/icons";
import { useState, useEffect } from 'react';

import { Link } from "react-router-dom";
import axios from 'axios';

const BillPayment = () => {

//get the message from server
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




  return (
    <ChakraProvider>
      <Grid
        templateAreas={`"header header"
                  "nav main"
                  "nav footer"`}
        gridTemplateRows={"50px 1fr 30px"}
        gridTemplateColumns={"150px 1fr"}
        h="100vh"
        gap={1}
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem pl={20} pb = {40} bg="gray.300"  area={"header"}>
          <Heading >Sri-Care</Heading>
        </GridItem>
        <GridItem pl={2} pt={30} bg="green.100" area={"nav"}>
        </GridItem>
        <GridItem pl={20} bg="grey" area={"main"} pt="10">
          <Heading>Bill Payment Options</Heading>
          <SimpleGrid columns={2} spacing={20} ml={10} mt={10} p={10}>
            <Card pb={0}>
            <Link to="/Payment">
              <CardBody>
                <PhoneIcon boxSize={20} />
              </CardBody>
              <CardFooter  p ={22} mt={20} h={40} bgColor="green.200">
                Recharge Or Bill Payment
              </CardFooter>
              </Link>
            </Card>
            <Card>
            <Link to="/Payment">
              <CardBody>
                <RepeatClockIcon boxSize={20} />
              </CardBody>
              <CardFooter p ={22} mt={20} h={40} bgColor="green.200">
                Payment History
              </CardFooter>
              </Link>
            </Card>
            </SimpleGrid>
           </GridItem>
      </Grid>
    </ChakraProvider>
  );
};

export default BillPayment;
