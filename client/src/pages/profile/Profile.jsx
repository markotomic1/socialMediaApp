import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import Update from "../../components/update/Update";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const [openUpdate, setOpenUpdate] = useState(false);
  const userId = parseInt(useLocation().pathname.split("/")[2]);
  const { isLoading, error, data } = useQuery(["user"], () =>
    makeRequest.get("/users/find/" + userId).then((res) => {
      return res.data;
    })
  );
  const { isLoading: relLoading, data: relationshipData } = useQuery(
    ["relationship"],
    () =>
      makeRequest.get("/relationships?folowedUserid=" + userId).then((res) => {
        return res.data;
      })
  );
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (following) => {
      if (following)
        return makeRequest.delete("/relationships?userId=" + userId);
      return makeRequest.post("/relationships", { userId });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["relationship"]);
      },
    }
  );
  const handleFollow = () => {
    mutation.mutate(relationshipData.includes(currentUser.id));
  };

  return (
    <>
      {isLoading ? (
        "loading"
      ) : (
        <div className='profile'>
          <div className='images'>
            <img src={`/upload/${data.coverPic}`} alt='' className='cover' />
            <img
              src={`/upload/${data.profilePic}`}
              className='profilePic'
              alt=''
            />
          </div>
          <div className='profileContainer'>
            <div className='uInfo'>
              <div className='left'>
                <div className='icons'>
                  <a href='http://facebook.com'>
                    <FacebookTwoToneIcon />
                  </a>
                  <a href='http://facebook.com'>
                    <InstagramIcon fontSize='medium' />
                  </a>
                </div>
                <div className='icons'>
                  <a href='http://facebook.com'>
                    <TwitterIcon fontSize='medium' />
                  </a>
                  <a href='http://facebook.com'>
                    <LinkedInIcon fontSize='medium' />
                  </a>
                </div>
              </div>
              <div className='center'>
                <span>{data.name}</span>
                <div className='info'>
                  <div className='item'>
                    <PlaceIcon />
                    <span>{data.city}</span>
                  </div>
                  <div className='item'>
                    <LanguageIcon />
                    <span>{data.website}</span>
                  </div>
                </div>
                {relLoading ? (
                  "loading"
                ) : userId === currentUser.id ? (
                  <button onClick={() => setOpenUpdate(true)}>update</button>
                ) : (
                  <button onClick={handleFollow}>
                    {relationshipData.includes(currentUser.id)
                      ? "Following"
                      : "Follow"}
                  </button>
                )}
              </div>
              <div className='right'>
                <EmailOutlinedIcon />
                <MoreVertIcon />
              </div>
            </div>
            <Posts userId={userId} />
          </div>
        </div>
      )}
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
    </>
  );
};

export default Profile;
