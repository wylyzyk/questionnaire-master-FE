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
  return await http.get(`/question/${id}`);
}

// 创建问卷
export async function createQuestionService(): Promise<ResDataType> {
  return await http.post("/question");
}

// 获取问卷
export async function getQuestionListService(opts: Partial<ISearchOption>): Promise<ResDataType> {
  return await http.get(`/question`, { params: opts });
}

// 更新单个问卷
export async function updateQuestionService(id: string, data: { [key: string]: any }): Promise<ResDataType> {
  return await http.patch(`/question/${id}`, data);
}

// 复制问卷
export async function dupblicateQuestionService(id: string): Promise<ResDataType> {
  return await http.post(`/question/duplicate/${id}`);
}

// 批量彻底删除
export async function deleteQuestionService(ids: string[]): Promise<ResDataType> {
  return await http.post(`/question/delete`, { ids });
}
