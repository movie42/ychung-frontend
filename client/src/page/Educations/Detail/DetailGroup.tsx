import React, { useState } from "react";
import { Group, People } from "../../../state/educationGroup.atom";
import { useGet } from "../../../utils/customhooks/useGet";
import GroupPerson from "./GroupPerson";

interface IDetailGroupProps {
  group?: Group;
}

interface FetchGroup {
  _id: string;
  name: string;
  type: "student" | "worker" | "new" | "etc";
  humanIds: People;
}

const DetailGroup = ({ group }: IDetailGroupProps) => {
  const { data: humans, isSuccess } = useGet<People[]>({
    url: `/api/education/group/${group?._id}/people`,
    queryKey: "people",
  });

  return (
    <div>
      <h4>{group?.name}</h4>
      <ul>
        {humans?.map((value) => (
          <li>
            <GroupPerson key={value._id} person={value} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DetailGroup;
