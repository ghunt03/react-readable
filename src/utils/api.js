let token = localStorage.token;
if (!token)
  token = localStorage.token = Math.random()
    .toString(36)
    .substr(-8);

const headers = {
  Accept: "application/json",
  Authorization: token,
  "content-type": "application/json"
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

export const getComments = postId =>
  fetch(`${apiHost}posts/${postId}/comments`, { headers }).then(res =>
    res.json()
  );

export const postComment = data => {
  return fetch(`${apiHost}comments`, {
    method: "POST",
    body: JSON.stringify(data),
    headers
  })
    .then(res => res.json())
    .then(data => data);
};

export const updateComment = data => {
  return fetch(`${apiHost}comments/${data.id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers
  })
    .then(res => res.json())
    .then(data => data);
}

export const deleteComment = id => {
  return fetch(`${apiHost}comments/${id}`, {
    method: "DELETE",
    headers
  })
    .then(res => res.json())
    .then(data => data);
}

export const postPost= data => {
  return fetch(`${apiHost}posts`, {
    method: "POST",
    body: JSON.stringify(data),
    headers
  })
    .then(res => res.json())
    .then(data => data);
};

export const updatePost = data => {
  return fetch(`${apiHost}posts/${data.id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers
  })
    .then(res => res.json())
    .then(data => data);
}


//   id - Any unique ID. As with posts, UUID is probably the best here.
// timestamp - [Timestamp] Get this however you want.
// body - [String]
// author - [String]
// parentId - Should match a post id in the database.
