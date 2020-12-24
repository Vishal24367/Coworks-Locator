import React, { useRef, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Box, Button, Flex, 
  Image, Heading, 
  Stack, Text,
  Popover, ButtonGroup,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  useDisclosure,
  FormControl, FormLabel,
  Input
} from "@chakra-ui/react";
import * as UrlConstant from '../../constant/constant';
import store from '../../constant/store';
import * as actions from '../../constant/actionTypes';



const TextInput = React.forwardRef((props, ref) => {
  return (
    <FormControl>
      <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
      <Input type="number" ref={ref} id={props.id} {...props} />
    </FormControl>
  )
})

const Form = ({ firstFieldRef }) => {
  return (
    <Stack spacing={4}>
      <TextInput
        label="दूरी (in किलोमीटर)"
        id="radius"
        ref={firstFieldRef}
        defaultValue={1}
        type="number"
      />
      <TextInput label="ओफ़्सेट" id="offset" defaultValue={1} />
    </Stack>
  )
}

const Hero = ({
  title,
  subtitle,
  image,
  ctaLink,
  ctaText,
  ...rest
}) => {

    const [loader, setLoader] = useState(false);
    const firstFieldRef = useRef(null)
    const { onOpen, onClose, isOpen } = useDisclosure()

    const urlLauncher = async (url) => {
        try {
        const response = await fetch(UrlConstant.BASE_URL + url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        return response;
      } catch (e) {
        console.log(e);
       }
    }

    const fetchingLatLong = (e) => {
        let offset = parseInt(document.getElementById("offset").value);
        let radius = parseInt(document.getElementById("radius").value);
        let params = `?latitude=${28.5309835}&longitude=${77.3846918}&radius=${radius}&offset=${offset}`
        urlLauncher(UrlConstant.NEARBYCOWROKS + params).then((e) => {
          e.json().then((data) => {
            setLoader(false);
            if(data !== undefined && data !== null && data.length > 0){
              store.dispatch({
                type: actions.FETCH_COWORK_DATA,
                payload: {
                    data: data
                }
              });
              window.location.href = "/coworks";
            }
          })
        });
    }

  return (
    <Flex
      align="center"
      justify={{ base: "center", md: "space-around", xl: "space-between" }}
      direction={{ base: "column-reverse", md: "row" }}
      wrap="no-wrap"
      minH="70vh"
      px={8}
      mb={16}
      {...rest}
    >
      <Stack
        spacing={4}
        w={{ base: "80%", md: "40%" }}
        align={["center", "center", "flex-start", "flex-start"]}
      >
        <Heading
          as="h1"
          size="xl"
          fontWeight="bold"
          color="primary.800"
          textAlign={["center", "center", "left", "left"]}
        >
          {title}
        </Heading>
        <Heading
          as="h2"
          size="md"
          color="primary.800"
          opacity="0.8"
          fontWeight="normal"
          lineHeight={1.5}
          textAlign={["center", "center", "left", "left"]}
        >
          {subtitle}
        </Heading>
        <Link to={ctaLink}>
          <Popover
            initialFocusRef={firstFieldRef}
            placement="bottom"
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            closeOnBlur={false}
          >
            <PopoverTrigger>
              <Button
              colorScheme="primary"
              borderRadius="8px"
              py="4"
              px="4"
              lineHeight="1"
              size="md"
              >
                {ctaText}
              </Button>
            </PopoverTrigger>
            <PopoverContent color="white" bg="blue.800" borderColor="blue.800">
              <PopoverHeader pt={4} fontWeight="bold" border="0">
                करीबी कोवर्क ढूंढे
              </PopoverHeader>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody>
                <Form firstFieldRef={firstFieldRef} />
              </PopoverBody>
              <PopoverFooter
                border="0"
                d="flex"
                alignItems="center"
                justifyContent="space-between"
                pb={4}
              >
                <Box fontSize="sm">© Vishal76342 </Box>
                <ButtonGroup size="sm">
                  <Button colorScheme="blue" onClick={onClose} ref={firstFieldRef}>
                    रद्द करें
                  </Button>
                  <Button colorScheme="green" isLoading={loader} loadingText="खोजा जा रहा ह" onClick={fetchingLatLong}>
                    ढूंढे
                  </Button>
                </ButtonGroup>
              </PopoverFooter>
            </PopoverContent>
          </Popover>
        </Link>
        <Text
          fontSize="xs"
          mt={2}
          textAlign="center"
          color="primary.800"
          opacity="0.6"
        >
        क्लिक करने के बाद, ALLOW दबाओ
        </Text>
      </Stack>
      <Box w={{ base: "80%", sm: "60%", md: "50%" }} mb={{ base: 12, md: 0 }}>
        {/* TODO: Make this change every X secs */}
        <Image src={image} size="100%" rounded="1rem" shadow="2xl" />
      </Box>
    </Flex>
  );
}

export default withRouter(Hero);

Hero.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  image: PropTypes.string,
  ctaText: PropTypes.string,
  ctaLink: PropTypes.string
};