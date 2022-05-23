import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { educationGroups } from "../../state/educationGroup.atom";

const Wrapper = styled.div`
  margin-top: 8rem;
`;

const EducationGroupsDetail = () => {
  const navigate = useNavigate();
  const groups = useRecoilValue(educationGroups);

  return (
    <Wrapper>
      {/* <h1>{groups.title}</h1>
       <ul>
         {groups.groups.filter((value) => value.type === "student").length !==
          0 &&
          groups.groups.map((value) => (
            <li>
              <div>
                <h3>{value.name}</h3>
                <ul>
                  {value.humanIds.map((value) => (
                    <li>{value}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
      </ul> */}
    </Wrapper>
  );
};

export default EducationGroupsDetail;
