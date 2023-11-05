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
import { PhoneIcon, RepeatClockIcon, CalendarIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import axios from "axios";

const backgroundStyle = {
  backgroundImage: `url("./Revenue-cuate.svg")`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  height: "100vh",
  marginTop: "0px",
};

const BillPayment = () => {
  //get the message from server
  const [userDetails, setuserDetails] = useState("");

  //getting information from the userServices
useEffect(() => {
  axios.get('http://localhost:8080/api/user/all')
    .then(response => {
      setuserDetails(response.data.message);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}, []);

  return (
    <ChakraProvider>
      <div style={backgroundStyle}>
        <Grid
          templateAreas={`"header header"
                  "nav main"
                  "nav footer"`}
          gridTemplateRows={"50px 2fr 50px"}
          gridTemplateColumns={"150px 1fr"}
          h="50vh"
          gap={4}
          color="blackAlpha.700"
          fontWeight="bold"
        >
          <GridItem pl={20} pb={20} area={"header"}></GridItem>
          <GridItem pl={0} area={"main"} pt="10">
            <Heading ml={60}>Sri-Care Bill Payment Options</Heading>
            <SimpleGrid columns={3} spacing={10} ml={80} mt={20} p={5}>
              <Card pb={0} bg="gray.300" h={60}>
                <Link to="/Payment">
                  <CardBody bg="gray.300">
                    <PhoneIcon boxSize={20} mt={10} />
                  </CardBody>
                  <CardFooter
                    p={22}
                    mt={10}
                    h={20}
                    bgColor="green.200"
                    fontSize={26}
                    alignItems={"center"}
                  >
                    <p ml={20}> Recharge Or Bill Payment</p>
                  </CardFooter>
                </Link>
              </Card>
              <Card bg="gray.300" h={60}>
                <Link to="/paymnetHistory">
                  <CardBody bg="gray.300">
                    <RepeatClockIcon boxSize={20} mt={10} />
                  </CardBody>
                  <CardFooter
                    p={22}
                    mt={10}
                    h={20}
                    bgColor="green.200"
                    fontSize={26}
                    alignItems={"center"}
                  >
                    <p pl={40}>Payment History</p>
                  </CardFooter>
                </Link>
              </Card>
              <Card bg="gray.300" h={60}>
                <Link to="/bills">
                  <CardBody bg="gray.300">
                    <CalendarIcon boxSize={20} mt={10} />
                  </CardBody>
                  <CardFooter
                    p={22}
                    mt={10}
                    h={20}
                    bgColor="green.200"
                    fontSize={26}
                    alignItems={"center"}
                  >
                    Bills
                  </CardFooter>
                </Link>
              </Card>
            </SimpleGrid>
          </GridItem>
        </Grid>
      </div>
    </ChakraProvider>
  );
};

export default BillPayment;
