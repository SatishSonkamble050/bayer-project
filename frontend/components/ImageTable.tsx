"use client";

type Props = {
  data: any[];
  onView: (item: any) => void;
};

const ImageTable = ({ data, onView }: Props) => {
  return (
    <table className="w-full border ">
      <thead>
        <tr className="border-b">
          <th className="text-left">Thumbnail</th>
          <th className="text-left">Timestamp</th>
          <th className="text-left">Count</th>
          <th className="text-left">Action</th>
        </tr>
      </thead>

      <tbody>
        {data.map((item, i) => (
          <tr key={i} className="border-b p-4">
            <td>
              <img src={item.thumbnail} className="w-16 h-16 m-2" />
            </td>
            <td>{item.timestamp}</td>
            <td>{item.count}</td>
            <td>
              <button className="bg-blue-400 px-4 py-1  cursor-pointer text-white" onClick={() => onView(item)}>View</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ImageTable;