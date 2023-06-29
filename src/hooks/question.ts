import { useSearchParams } from "react-router-dom";
import { useRequest } from "ahooks";
import { getQuestionListService, ISearchOption } from "../network/question.ts";

export const useLoadQuestionList = (opts?: Partial<ISearchOption>) => {
  const { isDeleted, isStar } = opts || {};
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const page = parseInt(searchParams.get("page") || "", 10) || 1;
  const size = parseInt(searchParams.get("size") || "", 10) || 10;

  const {
    data = {},
    error,
    loading
  } = useRequest(
    async () => {
      return await getQuestionListService({ keyword, isStar, isDeleted, page, size });
    },
    {
      refreshDeps: [searchParams]
    }
  );
  return { data, error, loading };
};
