import { IContract, IItem, IResponse } from "interfaces";
import { getAuthToken } from "utils/helpers";
import httpService from "./httpService";

const route = `/contracts`;

export async function uploadContractsAPI(body: IContract[]) {
  return httpService.post(
    `${route}/upload
  `,
    body,
    { headers: { authorization: getAuthToken() } }
  ) as unknown as IResponse;
}

export async function getContractsAPI() {
  return httpService.get(`${route}`, {
    headers: { authorization: getAuthToken() },
  }) as unknown as IResponse;
}

export async function updateContract(body: any) {
  const _id = body._id;
  return httpService.put(`${route}/${_id}`, body, {
    headers: { authorization: getAuthToken() },
  }) as unknown as IResponse;
}

export async function updateContractItem(contractId: string, body: any) {
  const itemId = body._id;
  return httpService.put(`${route}/${contractId}/${itemId}`, body, {
    headers: { authorization: getAuthToken() },
  }) as unknown as IResponse;
}

export async function toggleLinkEvent({
  contractId,
  itemId,
  event,
}: {
  contractId: string;
  itemId: string;
  event: string;
}) {
  return httpService.patch(
    `${route}/${contractId}/${itemId}/event`,
    { body: event },
    {
      headers: { authorization: getAuthToken() },
    }
  ) as unknown as IResponse;
}

export async function deleteContract(_id: string) {
  return httpService.delete(`${route}/${_id}`, {
    headers: { authorization: getAuthToken() },
  }) as unknown as IResponse;
}

export async function publishContract(contractId: string, token: string) {
  return httpService.patch(
    `${route}/publish/${contractId}`,
    {},
    {
      headers: { authorization: getAuthToken() },
    }
  ) as unknown as IResponse;
}
