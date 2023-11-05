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
  backgroundImage: `url("./Invoice-amico.svg")`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  height: "100vh",
  marginTop: "0px",
};

const Bills = () => {
  const [paymentBills, setPaymentBills] = useState([]);

  const customer_id = localStorage.getItem("userId");

    useEffect(() => {
        axios
            .get(
                `http://localhost:8080/api/paymentBills?customer_id = ${customer_id}`
            )
            .then((response) => {
                setPaymentBills(response.data);
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
              <GridItem pl={20} pb={0} mt={20}>
                <Heading>Sri-Care-Bills</Heading>
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
                        Description
                      </Th>
                      <Th p={10} fontSize={20}>
                        Amount
                      </Th>
                      <Th p={10} fontSize={20}>
                        Date
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody fontSize={20} fontWeight={"bold"}>
                    {paymentBills.map((paymentBills) => (
                        <Tr>
                            <Td borderWidth="1px">{paymentBills.bill_id} </Td>
                            <Td borderWidth="1px">{paymentBills.message}</Td>
                            <Td borderWidth="1px">{paymentBills.amount}</Td>
                            <Td borderWidth="1px">{paymentBills.date}</Td>
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

export default Bills;
