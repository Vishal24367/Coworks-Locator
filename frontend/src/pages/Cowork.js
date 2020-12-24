import React, { useEffect, useState } from "react";

import CoworkItems from "../components/sections/CoworkCard";
import CoworkLayout from "../components/layouts/CoworkLayout";
import store from "../constant/store";

const Cowork = ({ data, ...rest }) => {
  const initialValue = [
    {
      address: "",
      id: 0,
      latitude: 0.0,
      longitude: 0.0,
      meeting_rooms_count: 0,
      name: "",
      uniqueKey: "",
    },
  ];
  const [coworkData, setCoworkData] = useState(initialValue);
  const [coworkDataCount, setCoworkDataCount] = useState(0);

  useEffect(() => {
    let cowork = store.getState()["cowork"];
    setCoworkData(cowork);
    setCoworkDataCount(cowork.length);
  }, []);

  return (
    <CoworkLayout>
      <CoworkItems cowork={coworkData} dataCount={coworkDataCount} />
    </CoworkLayout>
  );
};
export default Cowork;
