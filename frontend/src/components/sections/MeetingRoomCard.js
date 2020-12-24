import React, { useEffect, useState } from "react";
import { Box, Image, SimpleGrid, Badge, Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Select,
  ModalCloseButton, 
  useDisclosure,
  useToast,
  CircularProgress, CircularProgressLabel,
  Stack} from "@chakra-ui/react";
import store from '../../constant/store';
import * as UrlConstant from '../../constant/constant';
import { withRouter } from "react-router-dom";
import SuspenseImage from './SuspenseImage.tsx';


const MeetingRoomCard = ({meetingRoom, dataCount}) => {

  const initialValue = {
    meeting_room_id: "",
    allocated_times: []
  };

  const [loader, setLoader] = useState(false);
  const [selectedMeetingRoom, setSelectedMeetingRoom] = useState(initialValue);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectValue, setSelectValue] = React.useState("");
  const [selectDateValue, setSelectDateValue] = React.useState("");
  const [loadModal, setLoadModal] = useState(false);
  const toast = useToast();

  useEffect(() => {
    let allMeetingRoom = store.getState()["meeting_room"];
    if(allMeetingRoom.length > 0 && allMeetingRoom[0].meeting_room_id > 0){
      debugger
      setLoadModal(true);
    }
    else{
      window.location.href = "/";
    }
  }, []);

  const urlLauncher = async (url) => {
    let data = {
      time_slot_id: parseInt(selectValue),
      available_date_id: parseInt(selectDateValue),
      meeting_room_id: parseInt(selectedMeetingRoom.meeting_room_id)
    }
    try {
      const response = await fetch(UrlConstant.BASE_URL + url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      return response;
    } catch (e) {
      console.log(e);
      }
  }

  const showAvailableDatesAndTimeSlots = (currentMeetingRoom) => {
    setSelectedMeetingRoom(currentMeetingRoom);
    onOpen();
  }

  const handleChange = (e, selectedDateId) => {
    setSelectValue(e.target.value);
    setSelectDateValue(selectedDateId);
  }

  const bookMeetingRoom = (e) => {
    setLoader(true);
    urlLauncher(UrlConstant.BOOKMEETINGROOM).then((e) => {
      e.json().then((res) => {
        setLoader(false);
        let status = parseInt(res.internal_status);
        if(status === 40){
          toast({
            title: res.message,
            status: "success",
            duration: 4000,
            isClosable: true,
            });
          setTimeout(function(){onClose()}, 500);
          setSelectValue("");
          setSelectDateValue("");
        }
        else{
          toast({
            title: res.message,
            status: "error",
            duration: 4000,
            isClosable: true,
            });
          setSelectValue("");
          setSelectDateValue("");
        }
      });
    })
  }

  const tempProperty = {
    imageUrl: "https://source.unsplash.com/collection/404339/600x400",
    imageAlt: "Cowork with",
    beds: 3,
    baths: 2,
    title: "Coworks",
    formattedPrice: "$100.00",
    reviewCount: 34,
    rating: 3.5,
  }

  return (loadModal === true ? <>
  <React.Suspense fallback={<><CircularProgress mt={200} isIndeterminate size="150px" color="green.300"  thickness="2px"/></>}>
    <Modal isOpen={isOpen} onClose={(e) => {
        onClose();
        setSelectValue("");
        setSelectDateValue("");
      }} isCentered motionPreset="slideInBottom" scrollBehavior="inside" size="sm">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Available Dates</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
              <Stack spacing={5}>
                {selectedMeetingRoom.allocated_times.map((date) => {
                  return (
                    <Select key={date.availability_date_id} placeholder={date.available_date} disabled={selectValue !== "" && date.availability_date_id !== selectDateValue ? true : false} value={selectValue} onChange={(e) => {
                      handleChange(e, date.availability_date_id)
                    }}>
                      {date.time_slots.map((time_slot) => {
                        return (
                          <option key={time_slot.time_slot_id} value={time_slot.time_slot_id}>{time_slot.timing}</option>
                        );
                      })} 
                    </Select>
                  );
                })}
              </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={(e) => {
                onClose();
                setSelectValue("");
                setSelectDateValue("");
              }}>
              Close
            </Button>
            <Button colorScheme="primary" isLoading={loader} loadingText="Booking" onClick={bookMeetingRoom}>Book</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <SimpleGrid minChildWidth="250px" maxW={{ xl: "1200px" }} style={{width: "-webkit-fill-available"}} spacing="25px">
        {meetingRoom.map((property) => {
          return (
            <Box maxW="lg" borderWidth="1px" borderRadius="lg" overflow="hidden">
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
                    {property.allocated_times.length} Available Dates
                  </Box>
                </Box>

                <Box
                  mt="1"
                  fontWeight="semibold"
                  as="h4"
                  lineHeight="tight"
                  isTruncated
                >
                  {property.meeting_room_name}
                </Box>
                
                <Box d="flex" mt="3" as="h4" alignItems="center">
                  <Box 
                  as="button" 
                  borderRadius="md" 
                  bg="black" 
                  color="white" 
                  px={4} h={8} 
                  onClick={(e)=>{showAvailableDatesAndTimeSlots(property)}}
                  >
                    Book
                  </Box>
                </Box>
              </Box>
            </Box>
          );
        })}
      </SimpleGrid>
    </React.Suspense>
  </> : null);
}

export default withRouter(MeetingRoomCard);
