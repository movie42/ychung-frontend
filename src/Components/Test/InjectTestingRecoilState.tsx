import { People } from "@/lib/state";

interface IInjectTestingRecoilStateProps {
  people: People;
}

const InjectTestingRecoilState = ({
  people
}: IInjectTestingRecoilStateProps) => {
  // const setPeople = useSetRecoilState(groupAndpeopleState);

  // useEffect(() => {
  //   setPeople(people);
  // }, []);

  return people;
};

export default InjectTestingRecoilState;
