'use client'
import React, { useState, useEffect, useContext } from "react";
import AuthContext from "@/context/AuthContext";
import { toast } from "react-toastify";
import { uploadAvatar } from "@/backend/lib/uploadProfileActions"; // Import the function

const UpdateProfile = () => {
  const { user, error, loading, updateProfile, clearErrors } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/images/default.png");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar ? user.avatar.secure_url : "/images/default.png");
    }

    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [error, user]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);

    if (avatar) {
      const uploadResponse = await uploadAvatar(formData, user.name);

      if (uploadResponse.errMsg) {
        toast.error(uploadResponse.errMsg);
        return;
      }

      setAvatarPreview(uploadResponse.data.secure_url);
    }

    updateProfile({ name, email, avatar: avatarPreview });
  };

  const onChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
      }
    };

    setAvatar(file);
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ maxWidth: "480px" }} className="mt-1 mb-20 p-4 md:p-7 mx-auto rounded bg-white">
      <form onSubmit={submitHandler}>
        <h2 className="mb-5 text-2xl font-semibold">Update Profile</h2>

        <div className="mb-4">
          <label className="block mb-1"> Full Name </label>
          <input
            type="text"
            placeholder="Type your name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1"> Email </label>
          <input
            type="text"
            placeholder="Type your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1"> Avatar </label>
          <div className="mb-4 flex flex-col md:flex-row">
            <div className="flex items-center mb-4 space-x-3 mt-4 cursor-pointer md:w-1/5 lg:w-1/4">
              <img className="w-14 h-14 rounded-full" src={avatarPreview} />
            </div>
            <div className="md:w-2/3 lg:w-80">
              <input
                type="file"
                id="formFile"
                onChange={onChange}
                className="form-control block w-full px-2 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mt-6"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
