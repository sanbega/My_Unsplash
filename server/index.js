const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

const myPhotos = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1608306448197-e83633f1261c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fGRldmVsb3BlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    tags: [],
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZ3JhbW1pbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    tags: [],
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZ3JhbW1pbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    tags: [],
  },
];

function paginate(data, perPage, page) {
  return data.slice((page - 1) * perPage, page * perPage);
}

app.get("/photos", (req, res) => {
  const page = req.query.page || 1;

  const perPage = req.query.perPage || 12;

  res.json({
    data: paginate(myPhotos, perPage, page),
  });
});

app.post("/photos", (req, res) => {
  const url = req.body.url;
  const tags = req.body.tags;

  myPhotos.push({
    url,
    tags,
  });

  res.json({
    data: myPhotos,
  });
});

app.delete("/delete", (req, res) => {
  const { url } = req.body;
  const { tags } = req.body;

  res.json({
    data: myPhotos,
  });
  console.log("eliminado");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
