import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { makeRequest } from "../../axios.js";

const Share = () => {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");

  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newPost) => {
      return makeRequest.post("/posts", newPost);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);

      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    let img = "";
    if (file) img = await upload();
    mutation.mutate({ desc, img });
    setDesc("");
    setFile(null);
  };
  return (
    <div className='share'>
      <div className='container'>
        <div className='top'>
          <div className='left'>
            <img src={currentUser.profilePic} alt='' />
            <input
              type='text'
              placeholder={`Whats on your mind ${currentUser.name}?`}
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
          </div>
          <div className='right'>
            {file && (
              <img className='file' src={URL.createObjectURL(file)} alt='' />
            )}
          </div>
        </div>
        <hr />
        <div className='bottom'>
          <div className='left'>
            <input
              type='file'
              id='file'
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor='file'>
              <div className='item'>
                <img src={Image} alt='' />
                <span>Add Image</span>
              </div>
            </label>
            <div className='item'>
              <img src={Map} alt='' />
              <span>Add Place</span>
            </div>
            <div className='item'>
              <img src={Friend} alt='' />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className='right'>
            <button onClick={handleClick}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
