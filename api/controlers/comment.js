import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getComments = (req, res) => {
  const q =
    "SELECT c.*,u.id AS userId,name,profilePic FROM comments AS c JOIN users AS u ON (u.id=c.userid) WHERE c.postid=? ORDER BY c.createdAt DESC";

  db.query(q, [req.query.postId], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};
export const addComment = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.statss(401).json("You are not logged in");

  jwt.verify(token, "secretkey", (err, data) => {
    if (err) return res.status(403).json("Token is not valied!");
    const q =
      "INSERT INTO comments (`desc`,`createdAt`,`userid`,`postid`) VALUES(?)";

    const values = [
      req.body.desc,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      data.id,
      req.body.postId,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json("Comment has been created");
    });
  });
};
