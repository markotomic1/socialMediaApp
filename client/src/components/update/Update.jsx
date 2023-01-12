import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { makeRequest } from "../../axios";
import "./update.scss";
import Image from "../../assets/img.png";

const Update = ({ setOpenUpdate, user }) => {
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  const [text, setText] = useState({
    name: "",
    city: "",
    website: "",
  });

  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setText((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (user) => {
      return makeRequest.put("/users", user);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["user"]);
      },
    }
  );

  const handleUpdate = async (e) => {
    e.preventDefault();

    let coverUrl;
    let profileUrl;

    coverUrl = cover ? await upload(cover) : user.coverPic;
    profileUrl = profile ? await upload(profile) : user.profilePic;

    mutation.mutate({ ...text, coverPic: coverUrl, profilePic: profileUrl });
    setOpenUpdate(false);
  };
  return (
    <div className='update'>
      <div className='container'>
        <form>
          <div className='file'>
            <input
              type='file'
              onChange={(e) => setCover(e.target.files[0])}
              id='cover'
              style={{ display: "none" }}
            />
            <label htmlFor='cover'>
              <img src={Image} alt='' className='img' />
              Cover picture
            </label>
          </div>
          <div className='file'>
            <input
              type='file'
              onChange={(e) => setProfile(e.target.files[0])}
              id='profile'
              style={{ display: "none" }}
            />
            <label htmlFor='profile'>
              <img src={Image} alt='' className='img' />
              Profile picture
            </label>
          </div>
          <input
            type='text'
            placeholder='name'
            name='name'
            onChange={handleChange}
          />
          <input
            type='text'
            placeholder='city'
            name='city'
            onChange={handleChange}
          />
          <input
            type='text'
            placeholder='website'
            name='website'
            onChange={handleChange}
          />

          <button onClick={handleUpdate}>Update</button>
        </form>
      </div>
      <div className='buttonDiv'>
        <button onClick={() => setOpenUpdate(false)}>X</button>
      </div>
    </div>
  );
};

export default Update;
