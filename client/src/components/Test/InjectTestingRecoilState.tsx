import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { peopleState, People } from "../../state/educationGroup.atom";

interface IInjectTestingRecoilStateProps {
  people: People[];
}

const InjectTestingRecoilState = ({
  people,
}: IInjectTestingRecoilStateProps) => {
  const setPeople = useSetRecoilState(peopleState);

  useEffect(() => {
    setPeople(people);
  }, []);

  return null;
};

export default InjectTestingRecoilState;
