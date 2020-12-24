import React from "react";
import { Box } from "@chakra-ui/react";
import Animall from "./logoIcon.png";

export default function Logo(props) {
  return (
    <Box {...props}>
      <img src={Animall} alt={"Logo"} />
    </Box>
  );
}
