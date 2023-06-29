import http, { ResDataType } from "./index.ts";

export interface ISearchOption {
  keyword: string;
  isDeleted: boolean;
  isStar: boolean;
  page: number;
  size: number;
}

// 获取单个问卷信息
export async function getQuestionService(id: string): Promise<ResDataType> {
  return await http.get(`/api/question/${id}`);
}

// 创建问卷
export async function createQuestionService(): Promise<ResDataType> {
  return await http.post("/api/question");
}

// 获取问卷
export async function getQuestionListService(opts: Partial<ISearchOption>): Promise<ResDataType> {
  return await http.get(`/api/question`, { params: opts });
}
