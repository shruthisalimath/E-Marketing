const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    //  include its associated Products
    include: [
      {
        model: Product,
      }
    ],
  })
    .then((categories) => res.status(200).json(categories))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: {
      id: req.params.id,
    },
    // include its associated Products
    include: [
      {
        model: Product,
      }
    ],
  })
    .then((categories) => {
      if (!categories) {
        res.status(404).json({
          message: 'no category found with this id'
        });
        return;
      }
      res.status(200).json(categories);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
    .then(categories => res.status(200).json(categories))
    .catch((err) => res.status(500).json(err));
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then((categories) => {
    if (!categories) {
      res.status(404).json({
        message: 'no category found with this id'
      });
      return;
    }
    res.status(200).json(categories);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((categories) => {
      if (!categories) {
        res.status(404).json({
          message: 'no category found with this id'
        });
        return;
      }
      res.status(200).json(categories);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;

