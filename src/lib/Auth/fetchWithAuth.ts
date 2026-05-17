/* eslint-disable @typescript-eslint/no-explicit-any */

export async function fetchWithAuth(url: string, options: any = {}) {
  let res = await fetch(url, {
    ...options,
    credentials: "include",
  });

  // access token expired
  if (res.status === 401) {
    const refreshRes = await fetch("/api/auth/refresh", {
      method: "POST",
      credentials: "include",
    });

    if (refreshRes.ok) {
      // retry original request
      res = await fetch(url, {
        ...options,
        credentials: "include",
      });
    } else {
      // refresh failed -> logout
      window.location.href = "/login";
    }
  }

  return res;
}
