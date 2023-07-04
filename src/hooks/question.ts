import { useParams, useSearchParams } from "react-router-dom";
import { useRequest } from "ahooks";
import { getQuestionListService, getQuestionService, ISearchOption } from "../network/question.ts";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetComponents } from "../stores/componentsList";

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

export function useLoadQuestionData() {
  const { id = "" } = useParams();

  const { data, loading, error, run } = useRequest(
    async (id: string) => {
      if (!id) throw new Error("没有问卷id");
      return await getQuestionService(id);
    },
    { manual: true }
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (!data) return;
    const { componentList = [] } = data;

    let selectedId = "";
    if (componentList.length > 0) {
      selectedId = componentList[0].fe_id;
    }

    dispatch(resetComponents({ componentList, selectedId }));
  }, [data]);

  useEffect(() => {
    run(id);
  }, [id]);
  return [loading, error];
}
