// @desc Logins user to the database
export const login = async (formData) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    return res;
  } catch (err) {
    console.error(err);
  }
};

export const authGoogle = async (token) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login/google`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    },
  );
  
  if (res.ok) {
    const data = await res.json();
    return data;
  }

  return null;
};

// @desc Signsup user to the database
export const signup = async (formData) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    return res;
  } catch (err) {
    console.error(err);
  }
};

export const verify = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/verify`, {
    method: "GET",
    credentials: "include",
  });

  if (res.ok) {
    const data = await res.json();
    return data;
  }

  return null;
};

export const logout = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (res.ok) {
    const data = await res.json();
    return data;
  }

  return null;
};
