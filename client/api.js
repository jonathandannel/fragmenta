export const register = fieldValues =>
  fetch("/auth/register", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(fieldValues)
  })
    .then(res => res.json())
    .then(({ message, success }) => ({ message, success }));

export const login = fieldValues =>
  fetch("/auth/login", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(fieldValues)
  })
    .then(res => res.json())
    .then(({ message, success, token, user }) => {
      localStorage.setItem("jwt", token);
      return {
        message,
        success,
        token,
        user
      };
    });

export const verifyToken = () =>
  fetch("/verify", {
    method: "get",
    headers: { authorization: localStorage.getItem("jwt") }
  })
    .then(res => res.json())
    .then(user => ({ user }));
