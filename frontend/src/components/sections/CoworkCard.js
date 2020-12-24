import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Box, CircularProgress, SimpleGrid, Badge } from "@chakra-ui/react";
import * as UrlConstant from '../../constant/constant';
import { StarIcon } from '@chakra-ui/icons'
import store from '../../constant/store';
import * as actions from '../../constant/actionTypes';
import SuspenseImage from './SuspenseImage.tsx';


const CoworkCard = ({cowork, dataCount, ...rest}) => {

    const [loadCards, setLoadCards] = useState(false);

    useEffect(() => {
      let allCowork = store.getState()["cowork"];
      if(allCowork.length > 0 && allCowork[0].id > 0){
        setLoadCards(true);
      }
      else{
        window.location.href = "/";
      }
    }, []);

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

    const tempProperty = {
      imageUrl: "https://source.unsplash.com/collection/404339/600x400",
      imageAlt: "Cowork with",
      beds: 3,
      baths: 2,
      title: "Coworks",
      formattedPrice: "$1,900.00",
      reviewCount: 34,
      rating: 3
    }

    const fetchingMeetingRooms = (coworkUniqueKey) => {
        let params = `?uniqueKey=${coworkUniqueKey}`
        urlLauncher(UrlConstant.ALLMEETINGROOMS + params).then((e) => {
          e.json().then((data) => {
            if(data.data.length > 0){
              store.dispatch({
                type: actions.FETCH_MEETING_ROOM_DATA,
                payload: {
                    data: data.data
                }
              });
              window.location.href = "/meeting_rooms";
            }
          });
        })
    }

  return ( loadCards === true ? <>
  <React.Suspense fallback={<><CircularProgress mt={200} isIndeterminate size="150px" color="green.300"  thickness="2px"/></>}>
    <SimpleGrid minChildWidth="250px" maxW={{ xl: "1200px" }} style={{width: "-webkit-fill-available"}} spacing="25px">
      {cowork.map((property) => {
        return (
            <Box maxW="lg" key={property.id} borderWidth="1px" borderRadius="lg" overflow="hidden">
            <SuspenseImage src={tempProperty.imageUrl}/>
            <Box p="6">
              <Box d="flex" alignItems="baseline">
                <Badge borderRadius="full" px="2" colorScheme="teal">
                  New
                </Badge>
                <Box
                  color="gray.500"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  fontSize="xs"
                  textTransform="uppercase"
                  ml="2"
                >
                  {property.meeting_rooms_count} meeting rooms
                </Box>
              </Box>

              <Box
                mt="1"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                isTruncated
              >
                {property.name}
              </Box>

              <Box>
                {tempProperty.formattedPrice}
                <Box as="span" color="gray.600" fontSize="sm">
                  / day
                </Box>
              </Box>

              <Box d="flex" mt="2" alignItems="center">
                <Box mt="1" fontWeight="semibold" as="h4">
                  Address :-
                </Box>
                <Box as="h3" ml="2" mt="1" color="gray.600" fontSize="md">
                  {property.address}
                </Box>
              </Box>

              <Box d="flex" mt="2" alignItems="center">
                {Array(5)
                  .fill("")
                  .map((_, i) => (
                      <StarIcon
                        key={i}
                        color={i < tempProperty.rating ? "teal.500" : "gray.300"}
                      />
                  ))}
                <Box as="span" ml="2" color="gray.600" fontSize="sm">
                  {tempProperty.reviewCount} reviews
                </Box>
              </Box>
              
              <Box d="flex" mt="3" as="h4" alignItems="center">
                <Box 
                as="button" 
                borderRadius="md" 
                bg="black" 
                color="white" 
                px={4} h={8} 
                onClick={(e)=>{fetchingMeetingRooms(property.uniqueKey)}}
                >
                  Meeting Rooms
                </Box>
              </Box>
            </Box>
          </Box>
        );
      })}
    </SimpleGrid>
    </React.Suspense>
  </> : 
  <React.Suspense fallback={<>
    <CircularProgress value={59} size="100px" thickness="4px" />
  </>}></React.Suspense>
  );
}

export default withRouter(CoworkCard);
