import React from "react";
import { useParams } from "react-router";
import Loading from "../../../components/Loading";
import { Group } from "../../../state/educationGroup.atom";
import { useGet } from "../../../utils/customhooks/useGet";
import DetailGroup from "./DetailGroup";

interface IDetailGroupContainerProps {}

const DetailGroupContainer = () => {
  const { id } = useParams();
  const { data, isSuccess } = useGet<Group[]>({
    url: `/api/education/groups/${id}/group`,
    queryKey: "groups",
  });
  return isSuccess ? (
    <>
      <ul>
        {data
          ?.filter((value) => value.type === "student")
          .map((value) => (
            <DetailGroup group={value} />
          ))}
      </ul>
    </>
  ) : (
    <Loading />
  );
};

export default DetailGroupContainer;
