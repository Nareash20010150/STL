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
import {MdOutlineElectricBolt ,MdWaterDrop,MdPayment,MdOutlineLocalHospital} from "react-icons/md"
import { GiSteeringWheel ,GiUmbrella ,GiGamepad} from "react-icons/gi";
import { Link } from "react-router-dom";

const BillPayment = () => {
  
  const [showForm1, setShowForm1] = useState(false);
  const [showForm2, setShowForm2] = useState(false);
  const [showForm3, setShowForm3] = useState(false);



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
          <SimpleGrid columns={4} spacing={20} ml={10} mt={10} p={10}>
            <Card>
            <Link to="/bills">
              <CardBody>
                <PhoneIcon boxSize={12} />
              </CardBody>
              <CardFooter  pl ={12} bgColor="green.200">
                Phone Bills
              </CardFooter>
              </Link>
            </Card>
            <Card onClick={() => setShowForm1(!showForm1)}>
              <CardBody  pl ={20}><MdOutlineElectricBolt  size={60} /></CardBody>
              <CardFooter  pl ={10} bgColor="green.200">
              Electricity Bills
              </CardFooter>
            </Card>
            <Card onClick={() => setShowForm2(!showForm2)}>
              <CardBody pl ={20}><MdWaterDrop size={60}/></CardBody>
              <CardFooter  pl ={12} bgColor="green.200">
              Water Bills
              </CardFooter>
            </Card>
            <Card onClick={() => setShowForm3(!showForm3)}>
              <CardBody pl ={20}><GiSteeringWheel  size={60}/></CardBody>
              <CardFooter  pl ={12} bgColor="green.200">
              Automobile Bills
              </CardFooter>
            </Card>
            <Card onClick={() => setShowForm3(!showForm3)}>
              <CardBody pl ={20}><MdOutlineLocalHospital  size={60}/></CardBody>
              <CardFooter  pl ={12} bgColor="green.200">
               Hospitals Bills
              </CardFooter>
            </Card>
            <Card onClick={() => setShowForm3(!showForm3)}>
              <CardBody pl ={20}><GiUmbrella  size={60}/></CardBody>
              <CardFooter  pl ={12} bgColor="green.200">
               Insurance Bills
              </CardFooter>
            </Card>
            <Card onClick={() => setShowForm3(!showForm3)}>
              <CardBody pl ={20}><GiGamepad  size={60}/></CardBody>
              <CardFooter  pl ={12} bgColor="green.200">
               Entertainment Bills
              </CardFooter>
            </Card>
          </SimpleGrid>
        </GridItem>
        
      </Grid>
    </ChakraProvider>
  );
};

export default BillPayment;
