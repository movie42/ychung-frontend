import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: 8rem;
`;

interface InitialData {
  noneStudent: {
    [key: string]: { id: string; name: string; gender: string };
  };
  student: {
    [key: string]: { id: string; name: string; gender: string };
  };
  columns: {
    [key: string]: {
      id: string;
      title: string;
      groupId: string[];
    };
  };
  columnOrder: string[];
}

const initialData = {
  noneStudent: {
    "noneStudent-1": { id: "noneStudent-1", name: "고현수", gender: "mail" },
    "noneStudent-2": { id: "noneStudent-2", name: "김창원", gender: "mail" },
    "noneStudent-3": { id: "noneStudent-3", name: "이우연", gender: "mail" },
    "noneStudent-4": { id: "noneStudent-4", name: "박혜진", gender: "femail" },
    "noneStudent-5": { id: "noneStudent-5", name: "김승아", gender: "femail" },
  },
  student: {
    "student-1": { id: "student-1", name: "이승현", gender: "femail" },
    "student-2": { id: "student-2", name: "최다은", gender: "femail" },
    "student-3": { id: "student-3", name: "정준영", gender: "mail" },
    "student-4": { id: "student-4", name: "박도현", gender: "femail" },
    "student-5": { id: "student-5", name: "최우혁", gender: "mail" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "student",
      groupId: [
        "student-1",
        "student-2",
        "student-3",
        "student-4",
        "student-5",
      ],
    },
  },
  columnOrder: ["column-1"],
};

function EducationsAdmin() {
  const [state, setState] = useState<InitialData>(initialData);
  const column = state.columns["column-1"];
  return (
    <Wrapper>
      <h1>{column.title}</h1>
      {column.groupId.map((id) => (
        <div key={column.id}>{state.student[id].name}</div>
      ))}
    </Wrapper>
  );
}

export default EducationsAdmin;
