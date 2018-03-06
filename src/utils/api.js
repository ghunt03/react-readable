
let token = localStorage.token;
if (!token)
  token = localStorage.token = Math.random()
    .toString(36)
    .substr(-8);

const headers = {
  Accept: "application/json",
  Authorization: token
};
const apiHost = 'http://localhost:3001/'


export const getCategories = () => 
  fetch(`${apiHost}categories`, { headers })
    .then(res => res.json())
    .then(data => {
        console.log("d", data)
        return data.categories
    });

export const getAllPosts = () => {
  fetch(`${apiHost}posts`, { headers })
    .then(res => res.json())
    .then(data => {
        console.log("d", data)
        return data.posts
    });
}


