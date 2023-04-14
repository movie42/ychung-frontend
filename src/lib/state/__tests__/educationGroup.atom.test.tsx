import { renderHook } from "@testing-library/react";
import { useEffect } from "react";
import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";
import { People, peopleState } from "../educationGroup.atom";

describe("Education Group Test", () => {
  describe("People State", () => {
    it("recoil state 상태 테스트", async () => {
      const people: People[] = [
        {
          _id: "628b1c51d0b22a8aaf604a6b",
          name: "한정식",
          groupIds: ["628b1c4ed0b22a8aaf604a69"],
          type: "student"
        }
      ];

      const { result } = renderHook<People[], unknown>(
        () => {
          const setPeople = useSetRecoilState(peopleState);
          useEffect(() => {
            setPeople(people);
          }, [setPeople]);

          return useRecoilValue(peopleState);
        },
        {
          wrapper: RecoilRoot
        }
      );

      expect(result.current).toEqual([
        {
          _id: "628b1c51d0b22a8aaf604a6b",
          name: "한정식",
          groupIds: ["628b1c4ed0b22a8aaf604a69"],
          type: "student"
        }
      ]);
      expect(result.current.length).toEqual(1);
    });
  });
});
