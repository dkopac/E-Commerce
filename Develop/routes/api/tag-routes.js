const router = require("express").Router();
const { where } = require("sequelize");
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: Product,
  }).then((tags) => {
    if (!tags) {
      res.status(404).json({ message: "ID Number Not Found!!" });
      return;
    }
    res.status(200).json(tags);
  });
});

router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: { id: req.params.id },
    include: Product,
  }).then((tags) => {
    if (!tags) {
      res.status(404).json({ message: "ID Number Not Found!!" });
      return;
    }
    res.status(200).json(tags);
  });
});

router.post("/", (req, res) => {
  // create a new tag
  Tag.create(req.body);
  where: {
    id: req.params.id;
  }
  then((tags) => {
    if (!tags) {
      res.status(404).json({ message: "ID Number Not Found!!" });
      return;
    }
    res.status(200).json(tags);
  });
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: { id: req.params.id },
  })
    .then((tag) => {
      res.status(200).json(tag);
    })
    .catch((err) =>
      res.status(500).json({ "message: Internal server error": err })
    );
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: { id: req.params.id },
  })
    .then((tag) => {
      res.status(200).json(tag);
    })
    .catch((err) =>
      res.status(500).json({ "message: Internal server error": err })
    );
});

module.exports = router;
