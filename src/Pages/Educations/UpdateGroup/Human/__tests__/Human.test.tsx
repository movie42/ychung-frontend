import { render } from "@testing-library/react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import { People } from "@/lib/state";
import Human from "../Human";
import { theme } from "@/lib/style/theme";

describe("Human 컴포넌트 테스트", () => {
  const drag = jest.fn();
  const renderComponent = (state: People, index: number) =>
    render(
      <ThemeProvider theme={theme}>
        <DragDropContext onDragEnd={drag}>
          <Droppable
            droppableId="droppable"
            isDropDisabled={false}
          >
            {(provided) => (
              <div ref={provided.innerRef}>
                <Human
                  person={state}
                  index={index}
                />
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </ThemeProvider>,
      { wrapper: RecoilRoot }
    );

  it("컴포넌트에는 반드시 people.name이 포함되어야합니다.", () => {
    const people: People = {
      _id: "628b1c51d0b22a8aaf604a6b",
      name: "한정식",
      groupIds: ["628b1c4ed0b22a8aaf604a69"],
      type: "student"
    };

    const { getByText } = renderComponent(people, 1);
    const div = getByText(people.name) as HTMLDivElement;
    expect(div).toBeTruthy();
  });
});
