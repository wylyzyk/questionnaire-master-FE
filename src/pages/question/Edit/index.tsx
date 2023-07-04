import styled from "./index.module.scss";
import { EditorCanvas } from "./components/EditorCanvas";
import { useLoadQuestionData } from "../../../hooks/question.ts";
import {useDispatch} from "react-redux";
import {setSelectedId} from "../../../stores/componentsList";
import {LeftPanel} from "./components/LeftPanel";
import {RightPanel} from "./components/RightPanel";
import {EditorToolbar} from "./components/EditorToolbar";

export const Edit = () => {
  const [loading] = useLoadQuestionData();
  const dispatch = useDispatch()

  const handleClick = () => {
       dispatch(setSelectedId(""))
  }

  return (
    <div className={styled.container}>
      <div className={styled.header}>
        <EditorToolbar />
      </div>
      <div className={styled["content-wrapper"]}>
        <div className={styled["content"]}>
          <div className={styled["left"]}>
            <LeftPanel />
          </div>
          <div className={styled["main"]} onClick={handleClick}>
            <div className={styled["canvas-wrapper"]}>
              <EditorCanvas loading={loading as boolean} />
            </div>
          </div>
          <div className={styled["right"]}>
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  );
};
