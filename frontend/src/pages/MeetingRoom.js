import React, { useEffect, useState } from "react";

import MeetingRoomCard from "../components/sections/MeetingRoomCard";
import MeetingRoomLayout from "../components/layouts/MeetingRoomLayout";
import store from "../constant/store";

const MeetingRoom = ({ data }) => {
  const initialValue = [
    {
      meeting_room_address: "",
      meeting_room_id: 0,
      available_slots: [],
    },
  ];
  const [meetingRoom, setMeetingRoom] = useState(initialValue);
  const [meetingRoomCount, setMeetingRoomCount] = useState(0);

  useEffect(() => {
    let meeting_room = store.getState()["meeting_room"];
    setMeetingRoom(meeting_room);
    setMeetingRoomCount(meeting_room.length);
  }, []);

  return (
    <MeetingRoomLayout>
      <MeetingRoomCard meetingRoom={meetingRoom} dataCount={meetingRoomCount} />
    </MeetingRoomLayout>
  );
};
export default MeetingRoom;
