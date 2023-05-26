// services is related to any functions that use fetch calls. If you're using fetch calls within your application, and can be modulated put them here.

export const getAnalytics = async (instantlyId) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/email/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (res.ok) {
    const data = await res.json();
    return data;
  }

  return null;
};

export const getAnalytic = async (instantlyId) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/email/${instantlyId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    },
  );
  const data = await res.json();
  return data;
};
