"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { getCampaigns } from "@/services/campaign";
import { CampaignGallery } from "@/components/organisms/CampaignGallery/CampaignGallery";
import { Page } from "@/components/atoms/Page/Page";

export default function Campaign() {
  const form = useForm();
  const [data, setData] = useState(null);
  const [queryString, setQueryString] = useState("");
  const [page, setPage] = useState(0);

  const fetchApi = async () => {
    const data = await getCampaigns(queryString);
    setData(data);
  };
  
  const onSubmit = (formData) => {
    const queryString = new URLSearchParams(formData).toString();
    if (queryString) {
      setPage(0);
      setQueryString("?" + queryString);
    }
  };

  const nextPage = async (queryString) => {
    let data = null;
    const newPageNumber = page + 1;
    let url = `${queryString}&skip=${newPageNumber}`;

    if (!queryString) {
      // data = await getCampaigns(`?skip=${newPageNumber}`);
      url = `?skip=${newPageNumber}`;
    }

    data = await getCampaigns(url);

    // If data was returned, then spread new data in previous array
    if (data) {
      setPage(newPageNumber);
      setData((prev) => [...prev, ...data]);
    }
  };

  useEffect(() => {
    setData(null);
    fetchApi();
  }, [queryString]);

  return (
    <Page>
      <CampaignGallery
        form={form}
        onSubmit={onSubmit}
        queryString={queryString}
        nextPage={nextPage}
        page={page}
        campaigns={data}
      />
    </Page>
  );
}
