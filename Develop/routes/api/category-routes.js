const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  Category.findAll({
    include: [Product],
  })
    .then((categories) => {
      res.json(categories);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ "message: Internal server error": err });
    });
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: { id: req.params.id },
    include: Product,
  })
    .then((category) => {
      res.status(200).json(category);
    })
    .catch((err) =>
      res.status(500).json({ "message: Internal server error": err })
    );
});

router.post("/", (req, res) => {
  Category.create(req.body)
    .then((category) => {
      res.status(200).json(category);
    })
    .catch((err) =>
      res.status(500).json({ "message: Internal server error": err })
    );
});

router.put("/:id", (req, res) => {
  Category.update(req.body, {
    where: { id: req.params.id },
  })
    .then((category) => {
      res.status(200).json(category);
    })
    .catch((err) =>
      res.status(500).json({ "message: Internal server error": err })
    );
});

router.delete("/:id", (req, res) => {
  Category.destroy({
    where: { id: req.params.id },
  })
    .then((category) => {
      res.status(200).json(category);
    })
    .catch((err) =>
      res.status(500).json({ "message: Internal server error": err })
    );
});

module.exports = router;
