"use client";

import { useEffect, useState } from "react";
import ImageTable from "./ImageTable";
import ViewImages from "./ViewImages";
import { getBatchById, getBatches } from "@/services/imageService";

// 🔹 Type for API response
type Batch = {
  id: string;
  thumbnail: string;
  timestamp: string;
  count: number;
};

// 🔹 Type for table data
type TableItem = {
  id: string;
  thumbnail: string;
  timestamp: string;
  count: number;
  images: string[];
};

const ListImages = () => {
  const [data, setData] = useState<TableItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedImages, setSelectedImages] = useState<string[] | null>(null);

  const fetchData = async () => {
    try {
      const res = await getBatches(1, 10);

      const formatted: TableItem[] = res.data.map((item: Batch) => ({
        id: item.id,
        thumbnail: item.thumbnail,
        timestamp: item.timestamp,
        count: item.count,
        images: [], // ⚠️ replace later with API call
      }));

      setData(formatted);
    } catch (err) {
      console.error("Error fetching batches:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleView = async (item: TableItem) => {
    console.log("View clicked:", item);

    // ⚡ Example: fetch images by batch ID (recommended)
    // const res = await getImagesByBatch(item.id);
    // setSelectedImages(res.data);

    // TEMP (for testing)
    
    const resp = await getBatchById(item.id)
    setSelectedImages(resp.images);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-5">
      <ImageTable data={data} onView={handleView} />

      {selectedImages && (
        <ViewImages
          images={selectedImages}
          onClose={() => setSelectedImages(null)}
        />
      )}
    </div>
  );
};

export default ListImages;