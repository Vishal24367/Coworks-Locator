import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Box, Button, Flex, Image, Heading, Stack, Text } from "@chakra-ui/react";
import * as UrlConstant from '../../constant/constant';
import store from '../../constant/store';
import * as actions from '../../constant/actionTypes';

const Hero = ({
  title,
  subtitle,
  image,
  ctaLink,
  ctaText,
  ...rest
}) => {

    const [loader, setLoader] = useState(false);
    const [coworkData, setCoworkData] = useState(null);

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

    const fetchingLatLong = (position) => {
        const { latitude, longitude } = position.coords;
        let url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=3bb95de2e5d94950b77e28c6dd4f227a`;
        fetch(url).then(response => response.json()).then((res) => {
            if(res.results[0].geometry !==  undefined && res.results[0].geometry !== null)
            {
              let lat = res.results[0].geometry.lat;
              let lng = res.results[0].geometry.lng;
              let rad = 1;
              let offset = 30;
              let params = `?latitude=${lat}&longitude=${lng}&radius=${rad}&offset=${offset}`
              urlLauncher(UrlConstant.NEARBYCOWROKS + params).then((e) => {
                e.json().then((data) => {
                  setLoader(false);
                  setCoworkData(data);
                  console.log("Setting cowork data",coworkData);
                  if(data !== undefined && data !== null && data.length > 0){
                    store.dispatch({
                      type: actions.FETCH_COWORK_DATA,
                      payload: {
                          data: data
                      }
                    });
                    window.history.pushState(data, '', "/coworks");
                    window.location.href = "/coworks";
                  }
                })
              })
            }
            
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
          <Button
            colorScheme="primary"
            borderRadius="8px"
            py="4"
            px="4"
            lineHeight="1"
            size="md"
            isLoading={loader} loadingText="खोजा जा रहा ह"
            onClick={(e) => {
                setLoader(true);
                navigator.geolocation.getCurrentPosition(fetchingLatLong, console.log);
            }}>
            {ctaText}
          </Button>
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