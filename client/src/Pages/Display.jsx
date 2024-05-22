import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

const Display = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://192.168.0.101:7000/users");
        console.log(response.data);
        setData(response.data);
      } catch (err) {
        alert("connection time out");
      }
    };
    getData();
  }, []);

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://192.168.0.101:7000/users/${userId}`);
      setData(data.filter((user) => user._id !== userId));
    } catch (err) {
      alert("Failed to delete user");
    }
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <td>Name</td>
              <td>Email</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((user, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b md:font-bold">
                    {user.name}
                  </td>
                  <td className="py-2 px-4 border-b md:font-bold">
                    {user.email}
                  </td>
                  <td className="py-2 px-4 border-b md:font-bold flex items-center space-x-3">
                    <span
                      className="text-xl md:text-2xl text-red-500 animate-pulse md:animate-bounce cursor-pointer"
                      onClick={() => deleteUser(user._id)}
                    >
                      <MdDelete />
                    </span>
                    <span className="text-xl md:text-2xl text-green-500 animate-pulse md:animate-bounce cursor-pointer">
                      <CiEdit />
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="py-2 px-4 text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Display;
