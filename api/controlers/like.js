import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getLikes = (req, res) => {
  const q = "SELECT userid FROM likes WHERE postid=?";

  db.query(q, [req.query.postId], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data.map((like) => like.userid));
  });
};
export const addLike = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("You are not logged in");

  jwt.verify(token, "secretkey", (err, data) => {
    if (err) return res.status(403).json("Token not valid");

    const q = "INSERT INTO likes (`userid`,`postid`) VALUES (?)";

    const values = [data.id, req.body.postId];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json("Post has been liked");
    });
  });
};
export const deleteLike = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("You are not logged in");

  jwt.verify(token, "secretkey", (err, data) => {
    if (err) return res.status(403).json("Token not valid");

    const q = "DELETE FROM likes WHERE `userid`=? AND `postid`=?";

    db.query(q, [data.id, req.query.postId], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json("Post has been disliked");
    });
  });
};
