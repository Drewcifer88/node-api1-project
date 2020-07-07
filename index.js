const express = require("express");
const server = express();
server.use(express.json());
const shortid = require("shortid");

let users = [
  {
    id: shortid.generate(),
    name: "Walter Kovacs",
    bio: "Uncompromising vigilante",
  },
  {
    id: shortid.generate(),
    name: "Bruce Wayne",
    bio: "Vigilante billionaire",
  },
  {
    id: shortid.generate(),
    name: "Travis Bickle",
    bio: "Taxi cab driver",
  },
];

server.get("/", (req, res) => {
  res.json("these are not heroes");
});

server.get("/api/users", (req, res) => {
  res.json(users);
});

server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  let findId = users.find((x) => x.id == id);
  if (findId) {
    res.status(200).json(findId);
  } else if (!findId) {
    res
      .status(404)
      .json("Error: The user with the specified ID does not exist");
  } else {
    res.status(500).json("Error: The user information could not be retrieved");
  }
});

server.post("/api/users", (req, res) => {
  let userInfo = req.body;
  userInfo.id = shortid.generate;
  if (userInfo.bio === "" || userInfo.name === "") {
    res.status(400).json("Please provide name and bio for the user.");
  } else if (!userInfo) {
    res.status(402).json("Error retrieving data");
  } else {
    users.push(userInfo);
    res.status(201).json(users);
  }
});

server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  let userId = users.filter((x) => x.id === id);

  if (userId.length === 0) {
    res
      .status(404)
      .json("Error: The user with the specified ID does not exist");
  } else if (!users) {
    res.status(500).json("Error: The user information could not be removed");
  } else {
    users = users.filter((x) => x.id != id);
    res.status(200).json(users);
  }
});

const port = 3000;
server.listen(port, () => {
  console.log("running");
});

//testing git
