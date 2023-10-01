import React, { useState } from "react";
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
import { PhoneIcon} from "@chakra-ui/icons";

import { Link } from "react-router-dom";

const BillPayment = () => {


  return (
    <ChakraProvider>
      <Grid
        templateAreas={`"header header"
                  "nav main"
                  "nav footer"`}
        gridTemplateRows={"50px 1fr 30px"}
        gridTemplateColumns={"150px 1fr"}
        h="80vh"
        gap={1}
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem pl={20} bg="grey.300" area={"header"}>
          <Heading >Sri-Care</Heading>
        </GridItem>
        <GridItem pl={2} bg="green.100" area={"nav"}>
        </GridItem>
        <GridItem pl={20} bg="grey" area={"main"} pt="10">
          <Heading>Bill Payment Options</Heading>
          <SimpleGrid columns={2} spacing={20} ml={10} mt={10} p={10}>
            <Card>
            <Link to="/bills">
              <CardBody>
                <PhoneIcon boxSize={12} />
              </CardBody>
              <CardFooter  pl ={12} bgColor="green.200">
                Recharge Or Bill Payment
              </CardFooter>
              </Link>
            </Card>
            <Card>
            <Link to="/bills">
              <CardBody>
                <PhoneIcon boxSize={12} />
              </CardBody>
              <CardFooter  pl ={12} bgColor="green.200">
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
