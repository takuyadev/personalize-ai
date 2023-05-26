"use client"
import React, { useEffect, useState } from 'react';
import { getAnalytics } from '@/services/analytics';
import { InstantlyGallery } from '@/components/organisms/InstantlyGallery/InstantlyGallery';

export default function Analytics() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchApi = async () => {
      const data = await getAnalytics();
      setData(data)
    };
    fetchApi()
  }, []);

  return (
    <>
      <div>
        <InstantlyGallery campaigns={data} />
      </div>
    </>
  )
}

