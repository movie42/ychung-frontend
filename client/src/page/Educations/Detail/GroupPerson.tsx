import React from "react";
import { People } from "../../../state/educationGroup.atom";

interface IGroupPersonProps {
  person: People;
}

const GroupPerson = ({ person }: IGroupPersonProps) => {
  return <li data-id={person._id}>{person.name}</li>;
};

export default GroupPerson;
