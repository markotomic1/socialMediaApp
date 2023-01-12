import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getRelationship = (req, res) => {
  const q = "SELECT folowerUserid FROM relationships WHERE folowedUserid=?";

  db.query(q, [req.query.folowedUserid], (err, data) => {
    if (err) return res.status(500).json(err);

    return res
      .status(200)
      .json(data.map((relationship) => relationship.folowerUserid));
  });
};

export const addRelationship = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("You are not logged in");

  jwt.verify(token, "secretkey", (err, data) => {
    if (err) return res.status(403).json("Token is not valid");

    const q =
      "INSERT INTO relationships (`folowerUserid`,`folowedUserid`) VALUES (?)";

    const values = [data.id, req.body.userId];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json("User has been followed");
    });
  });
};

export const deleteRelationship = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("You are not logged in");

  jwt.verify(token, "secretkey", (err, data) => {
    if (err) return res.status(403).json("Token is not valid");

    const q =
      "DELETE FROM relationships WHERE folowerUserid = ? AND folowedUserid = ?";

    const values = [data.id, parseInt(req.query.userId)];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json("User has been unfollowed");
    });
  });
};
