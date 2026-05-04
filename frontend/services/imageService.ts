const BASE_URL = "http://localhost:8000/images";

// -----------------------------
// 1️⃣ Generate Signed URL
// -----------------------------
export const getUploadUrl = async (file: File) => {
  const res = await fetch(`${BASE_URL}/generate-upload-url`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fileName: file.name,
      fileType: file.type,
    }),
  });

  if (!res.ok) throw new Error("Failed to get upload URL");

  return res.json();
};


// -----------------------------
// 2️⃣ Upload file to S3
// -----------------------------
export const uploadToS3 = async (
  uploadUrl: string,
  file: File
) => {
  const res = await fetch(uploadUrl, {
    method: "PUT",
    body: file,
  });

  if (!res.ok) throw new Error("Upload failed");
};


// -----------------------------
// 3️⃣ Save images in DB
// -----------------------------
export const saveImages = async (urls: string[]) => {
  const res = await fetch(`${BASE_URL}/save-images`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ urls }),
  });

  if (!res.ok) throw new Error("Save failed");

  return res.json();
};


// -----------------------------
// 4️⃣ Get batches (pagination)
// -----------------------------
export const getBatches = async (
  page = 1,
  limit = 10
) => {
  const res = await fetch(
    `${BASE_URL}/batches?page=${page}&limit=${limit}`
  );

  if (!res.ok) throw new Error("Fetch batches failed");

  return res.json();
};


// -----------------------------
// 5️⃣ Get single batch
// -----------------------------
export const getBatchById = async (id: number | string) => {
  const res = await fetch(`${BASE_URL}/batches/${id}`);

  if (!res.ok) throw new Error("Fetch batch failed");

  return res.json();
};