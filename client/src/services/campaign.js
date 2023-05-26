// services is related to any functions that use fetch calls. If you're using fetch calls within your application, and can be modulated put them here.

export const getCampaign = async (campaignId) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/campaigns/${campaignId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    },
  );

  if (res.ok) {
    const data = await res.json();
    return data;
  }

  return null;
};

export const getCampaigns = async (queryString) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/campaigns${queryString}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    },
  );
  if (res.ok) {
    const data = await res.json();
    return data;
  }
  return null;
};

export const addCampaign = async (formData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/campaigns`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ name: formData.name }),
  });

  return res;
};

// Updates Campaign based on provided formData
export const updateCampaign = async (formData, campaignId) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/campaigns/${campaignId}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name: formData.name,
        googlesheet_id: formData.googlesheet_id,
        instantly_id: formData.instantly_id,
      }),
    },
  );

  if (res.ok) {
    const data = await res.json();
    return data;
  }

  return null;
};

// Updates Campaign based on provided formData
export const deleteCampaign = async (campaignId) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/campaigns/${campaignId}`,
    {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    },
  );

  return res;
};

// Updates Campaign based on provided formData
export const getInstantlyCampaigns = async () => {
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
  return [];
};

// Import campaign to Instantly
export const exportCampaignToInstantly = async (campaignId) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/email/${campaignId}`,
    {
      method: "POST",
      credentials: "include",
    },
  );

  if (res.ok) {
    const data = res.json();
    return data;
  }
  return null;
};


export const getCamapignAnalytics = async (campaignId) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/campaigns/${campaignId}/analytics`,
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
