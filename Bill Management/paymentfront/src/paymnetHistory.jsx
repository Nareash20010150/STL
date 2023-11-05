import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Heading,
  ChakraProvider,
} from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react";
import axios from "axios";

const backgroundStyle = {
  backgroundImage: `url("./Credit.svg")`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  height: "100vh",
  marginTop: "0px",
};

const PaymentHistory = () => {
  const [paymentHistory, setPaymentHistory] = useState([]);
  //send customer id get from localstorage
  const customer_id = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/api/paymentHistory?customer_id = ${customer_id}`
      )
      .then((response) => {
        setPaymentHistory(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [customer_id]);

  return (
    <div>
      <ChakraProvider>
        <div style={backgroundStyle}>
          <Grid
            h="100vh"
            templateRows="repeat(4, 1fr)"
            templateColumns="repeat(5, 1fr)"
            gap={4}
          >
            <GridItem colSpan={2}>
              <GridItem pl={20} pb={40}>
                <Heading>Sri-Care - Payment History</Heading>
              </GridItem>
            </GridItem>

            <GridItem colSpan={4} alignContent={"center"}>
              <TableContainer>
                <Table
                  variant="simple"
                  colorScheme="teal"
                  size="lg"
                  borderColor={"black"}
                  ml={0}
                >
                  <Thead>
                    <Tr>
                      <Th p={10} fontSize={20}>
                        Bill ID
                      </Th>
                      <Th p={10} fontSize={20}>
                        Bill Description
                      </Th>
                      <Th p={10} fontSize={20}>
                        Payment Method
                      </Th>
                      <Th p={10} fontSize={20}>
                        Amount
                      </Th>
                      <Th p={10} fontSize={20}>
                        Payment Date
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody fontSize={20} fontWeight={"bold"}>
                    {paymentHistory.map((paymentHistory) => (
                      <Tr>
                        <Td borderWidth="1px">{paymentHistory.payment_id} </Td>
                        <Td borderWidth="1px">{paymentHistory.description}</Td>
                        <Td borderWidth="1px">{paymentHistory.payment_type}</Td>
                        <Td borderWidth="1px">
                          Rs. {paymentHistory.payment_amount}
                        </Td>
                        <Td borderWidth="1px">{paymentHistory.payment_date}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </GridItem>
          </Grid>
        </div>
      </ChakraProvider>
    </div>
  );
};

export default PaymentHistory;
