import { useState } from "react";

import * as ics from "ics";

const useMakeICS = () => {
  const [icsFile, setICSFile] = useState("");

  const convertDate = (date: string): [number, number, number] => {
    return date.split("-").map((value) => Number(value)) as [
      number,
      number,
      number
    ];
  };

  const saveICS = (date: string, name: string) => {
    const event: ics.EventAttributes = {
      start: [...convertDate(date)],
      duration: { minutes: 10 },
      title: `${name} 대표기도`,
      description: "양청 대표기도입니다.",
      busyStatus: "BUSY"
    };
    ics.createEvent(event, (error, value) => {
      setICSFile(value);
    });
  };

  return { saveICS, icsFile };
};

export default useMakeICS;
