import { IContract, IResponse } from "interfaces";
import httpService from "./httpService";

const route = `/docs`;

export async function uploadDocsAPI(body: IContract[], token: string) {
  return httpService.post(
    `${route}/upload
  `,
    body,
    { headers: { authorization: token } }
  ) as unknown as IResponse;
}

export async function getDocsAPI(token: string) {
  return httpService.get(`${route}`, {
    headers: { authorization: token },
  }) as unknown as IResponse;
}

export async function updateContract(body: IContract, token: string) {
  const _id = body._id;
  return httpService.put(`${route}/${_id}`, body, {
    headers: { authorization: token },
  }) as unknown as IResponse;
}

export async function updateContractItem(body: IContract, token: string) {
  const _id = body._id;
  return httpService.put(`${route}/${_id}`, body, {
    headers: { authorization: token },
  }) as unknown as IResponse;
}

