import httpService from "./httpService";

const route = `/blog`;

async function UpdateBlogPost(body, id) {
  let bodyFormData = new FormData();
  for (let eachKey in body) bodyFormData.append(eachKey, body[eachKey]);
  return await httpService.put(`${route}/${id}`, bodyFormData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

async function AddViewToBlogPost(id) {
  return await httpService.post(`${route}/${id}`);
}

async function CreateBlogPost(body) {
  let bodyFormData = new FormData();
  for (let eachKey in body) bodyFormData.append(eachKey, body[eachKey]);

  await httpService.post(`${route}`, bodyFormData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

async function DeleteBlogPost(id) {
  return await httpService.delete(`${route}/${id}`);
}

async function getArticles() {
  const url = process.env.NEXT_PUBLIC_BACKEND_BASE_URL + "/insights";
  let data = await fetch(url);
  data = await data.json();

  return data;
}

export {
  UpdateBlogPost,
  CreateBlogPost,
  AddViewToBlogPost,
  DeleteBlogPost,
  getArticles,
};
