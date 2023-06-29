import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getQuestionService } from "../../../network/question.ts";

export const Edit = () => {
  const { id = "" } = useParams();

  useEffect(() => {
    (async () => {
      const data = await getQuestionService(id);
      console.log(data);
    })();
  }, []);
  return <h1>Edit {id}</h1>;
};
