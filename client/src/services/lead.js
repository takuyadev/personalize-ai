// @desc Get single lead from database
export const getLead = async (leadId, campaignId) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/campaigns/${campaignId}/leads/${leadId}`,
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

// Update lead from using provided body
export const updateLead = async (campaignId, leadId, body) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/campaigns/${campaignId}/leads/${leadId}`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );

  const data = await res.json();
  return data;
};

// Update lead from using provided body
export const deleteLead = async (campaignId, leadId) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/campaigns/${campaignId}/leads/${leadId}`,
    {
      method: "DELETE",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    },
  );

  if (res.ok) {
    const data = await res.json();
    return data;
  }

  return null;
};

// Create lead from using provided body
export const createLead = async (campaignId, body) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/campaigns/${campaignId}/leads`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );
  if (res.ok) {
    const data = await res.json();
    return data;
  }

  return null;
};

// Get leads from Google Sheets
export const getSheetsFromGoogle = async (token) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/campaigns/search/google`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    },
  );
  const data = await res.json();
  return data;
};

export const exportLeadsToCsv = async (campaignId, campaignName) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/campaigns/export/${campaignId}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    },
  );

  // If res gives error status, return null
  if (!res.ok) {
    return;
  }

  // Create Blob, and host it on URL
  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);

  // Set anchor tag, and click on link
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${campaignName}-leads.csv`);
  document.body.appendChild(link);
  link.click();

  // Remove link after complete
  link.parentNode.removeChild(link);
};

export const exportLeadsToGoogle = async (token, campaignId) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/campaigns/export/google/${campaignId}`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
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

export const importLeadsFromCsv = async (campaignId, data) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/campaigns/import/${campaignId}`,
    {
      method: "POST",
      credentials: "include",
      body: data,
    },
  );
  return res;
};

export const importLeadsFromGoogle = async (campaignId, sheetId, token) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/campaigns/import/google/${campaignId}`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ googlesheet_id: sheetId }),
    },
  );
  return res;
};

// Update lead from using provided body
export const generatePersonalization = async (campaignId) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/ai/${campaignId}`,
    {
      method: "PUT",
      credentials: "include",
    },
  );
  return res;
};

export const submitGenerate = async (campaignId, leadId) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/ai/${campaignId}/${leadId}`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  if (res.ok) {
    const data = await res.json();
    return data;
  }

  return null;
};
