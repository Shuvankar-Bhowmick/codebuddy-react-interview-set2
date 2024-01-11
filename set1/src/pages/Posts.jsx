import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Posts = () => {
  const [data, setData] = useState([]);
  // register a side-effect to fetch data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch("https://codebuddy.review/posts");
        if (!resp.ok) {
          throw new Error("Error fetching data");
        }

        const respData = await resp.json();
        console.log(respData.data);
        setData(respData.data);
      } catch (e) {
        console.log("Error: " + e);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="rounded-lg bg-gray-50 p-7 text-gray-900 shadow-lg">
      <h1 className="mb-7 text-4xl font-bold">Posts</h1>
      <Link to="/" className="mb-4 flex items-center text-blue-600 hover:underline">
        <Icon icon="mdi:arrow-left" className="mr-2" />
        Back to Home
      </Link>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 ">
        {data.map((post, index) => (
          <>
            <div className="rounded-lg bg-white p-4 shadow-md">
              <h2 className="mb-4 text-2xl font-bold">Post {index + 1}</h2>

              <div className="grid  gap-4">
                {Object.entries(post).map(([key, value]) => (
                  <div key={key} className="grid grid-cols-2 items-center">
                    <div className=" col-span-1 mr-2 font-medium text-gray-700">{key}:</div>{" "}
                    <div className="col-span-1   md:col-span-1">
                      {key === "image" || key === "avatar" ? (
                        <img src={value} alt={key} className="h-20 w-20 rounded-full" />
                      ) : (
                        <span className="text-gray-900">{value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default Posts;
