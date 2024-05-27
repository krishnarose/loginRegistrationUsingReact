import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { toast } from "react-hot-toast";


const Display = () => {
  const [data, setData] = useState([]);

  const [editUser, setEditUser] = useState(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

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
      toast.success("User deleted successfully!");
    } catch (err) {
      alert("Failed to delete user");
    }
  };

  const updateUser = async (userId) => {
    try {
      const response = await axios.put(
        `http://192.168.0.101:7000/users/${userId}`,
        { email, name }
      );
      // Update the local state to reflect the changes
      setData(
        data.map((user) => (user._id === userId ? response.data.user : user))
      );
      // Close the modal
      document.getElementById("my_modal_1").close();
      toast.success("User updated successfully!");
    } catch (err) {
      alert("Failed to update user");
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
                    {/* Open the modal using document.getElementById('ID').showModal() method */}
                    <button
                      className="text-xl md:text-2xl text-green-500 animate-pulse md:animate-bounce cursor-pointer"
                      onClick={() => {
                        setEditUser(user);
                        setEmail(user.email);
                        setName(user.name);
                        document.getElementById("my_modal_1").showModal();
                      }}
                    >
                      <CiEdit />
                    </button>
                    <dialog id="my_modal_1" className="modal">
                      <div className="modal-box">
                        <h3 className=" text-center font-bold md:text-lg">
                          Upadate Details
                        </h3>
                        <div className="flex flex-col gap-5 mt-5">
                          <input
                            type="text"
                            placeholder="update email id"
                            className="w-full input input-bordered"
                            value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          />
                          <input
                            type="text"
                            placeholder="update username"
                            className="w-full input input-bordered"
                            value={name}
                          onChange={(e) => setName(e.target.value)}
                          />
                          <button
                            className="btn bg-sky-400 font-bold hover:bg-sky-600 text-white "
                             onClick={() => updateUser(editUser._id)}
                          >
                            Update details
                          </button>
                        </div>
                        <div className="modal-action">
                          <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                          </form>
                        </div>
                      </div>
                    </dialog>
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
