export const register = fieldValues =>
  fetch("/api/auth/register", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(fieldValues)
  })
    .then(res => res.json())
    .then(({ message, success }) => ({ message, success }));

export const login = fieldValues =>
  fetch("/api/auth/login", {
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
  fetch("/api/verify", {
    method: "get",
    headers: { authorization: localStorage.getItem("jwt") }
  })
    .then(res => res.json())
    .then(user => {
      return { user, token: localStorage.getItem("jwt") };
    });
