export const logout = async () => {
  const res = await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });

  return res.json();
};