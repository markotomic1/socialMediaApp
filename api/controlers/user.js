import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
  const userId = req.params.id;

  const q = "SELECT * FROM users where id=?";

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);

    const { password, ...info } = data[0];

    return res.status(200).json(info);
  });
};
export const updateUser = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("You are not logged in");

  jwt.verify(token, "secretkey", (err, data) => {
    if (err) return res.status(403).json("Token is not valid");

    const q =
      "UPDATE users SET `name`=?,`city`=?,`website`=?,`coverPic`=?,`profilePic`=? WHERE id=?";

    const values = [
      req.body.name,
      req.body.city,
      req.body.website,
      req.body.coverPic,
      req.body.profilePic,
      data.id,
    ];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0) return res.status(200).json("Updated");
      return res.status(403).json("You can update only your post");
    });
  });
};
