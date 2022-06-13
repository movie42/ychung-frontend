import { render } from "@testing-library/react";
import Human from "../Human";

describe("Human 컴포넌트 테스트", async () => {
  it("컴포넌트에는 반드시 사람 이름이 포함되어야합니다.", () => {
    const { getByText } = render(<Human humanId={"1"} index={1} />);
    const div = getByText("");
  });
});
