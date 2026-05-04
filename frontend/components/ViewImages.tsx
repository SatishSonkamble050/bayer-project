"use client";

import { useState } from "react";

type Props = {
  images: string[];
  onClose: () => void;
};

const ViewImages = ({ images, onClose }: Props) => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] h-[90%] p-4 rounded-xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Images</h2>
          <button onClick={onClose} className="text-red-500">Close</button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 overflow-y-auto">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              onClick={() => setSelected(img)}
              className="w-full aspect-[1/1] object-cover rounded cursor-pointer hover:scale-105 transition"
            />
          ))}
        </div>

        {/* Preview Modal */}
        {selected && (
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center"
            onClick={() => setSelected(null)}
          >
            <img src={selected} className="max-h-[90%] max-w-[90%] rounded" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewImages;