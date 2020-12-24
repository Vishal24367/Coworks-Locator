import React, { useState } from "react";
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
  Stack} from "@chakra-ui/react";
// import * as UrlConstant from '../../constant/constant';


export default function MeetingRoom({meetingRoom, dataCount, ...rest}) {

  const initialValue = {allocated_times: []};
  // const [loader, setLoader] = useState(false);
  const [selectedMeetingRoom, setSelectedMeetingRoom] = useState(initialValue);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectValue, setSelectValue] = React.useState("");
  const [selectDateValue, setSelectDateValue] = React.useState("");

  // const urlLauncher = async (url) => {
  //     try {
  //     const response = await fetch(UrlConstant.BOOKMEETINGROOM + url, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       }
  //     });
  //     return response;
  //   } catch (e) {
  //     console.log(e);
  //     }
  // }

  const showAvailableDatesAndTimeSlots = (currentMeetingRoom) => {
    setSelectedMeetingRoom(currentMeetingRoom);
    onOpen()
  }

  const handleChange = (e, selectedDateId) => {
    setSelectValue(e.target.value);
    setSelectDateValue(selectedDateId);
    console.log(selectValue, selectDateValue);
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

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="slideInBottom" scrollBehavior="inside" size="xs">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Available Dates</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
              <Stack spacing={5}>
                {selectedMeetingRoom.allocated_times.map((date) => {
                  return (
                    <Select placeholder={date.available_date} disabled={selectValue !== "" && date.availability_date_id !== selectDateValue ? true : false} value={selectValue} onChange={(e) => {
                      handleChange(e, date.availability_date_id)
                    }}>
                      {date.time_slots.map((time_slot) => {
                        return (
                          <option value={time_slot.time_slot_id}>{time_slot.timing}</option>
                        );
                      })} 
                    </Select>
                  );
                })}
              </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <SimpleGrid minChildWidth="250px" maxW={{ xl: "1200px" }} style={{width: "-webkit-fill-available"}} spacing="25px">
        {meetingRoom.map((property) => {
          return (
            <Box maxW="lg" borderWidth="1px" borderRadius="lg" overflow="hidden">
              <Image 
                src={tempProperty.imageUrl} 
                alt={tempProperty.imageAlt + `${property.meeting_room_name} meeting rooms`} 
                onClick={(e)=>{}}
              />
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
                    {property.length} meeting rooms
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
    </>);
}

MeetingRoom.propTypes = {

};
