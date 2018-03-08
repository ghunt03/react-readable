let token = localStorage.token;
if (!token)
  token = localStorage.token = Math.random()
    .toString(36)
    .substr(-8);

const headers = {
  Accept: "application/json",
  Authorization: token,
  'content-type': "application/json"
};
const apiHost = "http://localhost:3001/";

export const getCategories = () =>
  fetch(`${apiHost}categories`, { headers })
    .then(res => res.json())
    .then(data => {
      return data.categories;
    });

export const getAllPosts = () =>
  fetch(`${apiHost}posts`, { headers }).then(res => res.json());

export const updateVote = (id, option, type) => {
  const data = { option };
  const apiUrl =
    type === "post" ? `${apiHost}posts/${id}` : `${apiHost}comments/${id}`;
  
  return fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify(data),
    headers
  })
    .then(res => res.json())
    .then(data => data);
};
