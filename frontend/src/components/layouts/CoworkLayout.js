import React from "react";
import { Flex } from "@chakra-ui/react";
import Header from "../sections/Header";

export default function CoworkLayout(props) {
  return (
    <Flex
      direction="column"
      color="black"
      align="center"
      maxW={{ xl: "1200px" }}
      m="0 auto"
      {...props}
    >
      <Header />
      {props.children}
    </Flex>
  );
}