// @desc Get single lead from database
export const updateUser = async (formData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(formData),
  });

  if (res.ok) {
    const data = res.json();
    return data;
  }

  return null;
};

// @desc Get single lead from database
export const getUser = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (res.ok) {
    const data = res.json();
    return data;
  }

  return null;
};


export const getUserAnalytics = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/user/analytics`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    },
  );

  if (res.ok) {
    const data = await res.json();
    return data
  }

  return null
};