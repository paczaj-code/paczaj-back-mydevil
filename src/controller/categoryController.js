const getDb = require('../db/db').getBd;
const Validator = require('../validator/validator');
const { ObjectId } = require('mongodb');
const NotFoundException = require('../exceptions/NotFoundException.js');

class CategoryController {
  static async createMainCategory(req, res, next) {
    try {
      const db = getDb();
      const cateCollection = db.collection('categories');
      await Validator.chechSChema(req, res, next);

      await Validator.validateIsUniqueInCollection(
        cateCollection,
        { name: req.body.name },
        'Such name already exists'
      );

      const category = {
        ...req.body,
        createdAt: new Date(Date.now()),
        modifiedAt: new Date(Date.now()),
      };

      if (req.body.mainCategory !== null) {
        category.mainCategory = new ObjectId(req.body.mainCategory);
      }
      const result = await cateCollection.insertOne(category);
      res.status(201).json(result);
    } catch (error) {
      return res.status(error.code).json({ message: error.message });
    }
  }

  static async updateMainCategory(req, res, next) {
    const categoryId = req.params.catId;

    const db = getDb();
    const cateCollection = db.collection('categories');
    try {
      // Validation is correct ObjectId
      await Validator.validateIsValidObjectId(categoryId);

      // Validation id exists in collection
      await Validator.validateExistInCollection(
        cateCollection,
        categoryId,
        'Such A type not exists in collection'
      );
      Validator.chechSChema(req, res, next);

      // Validation name uniqness
      await Validator.validateIsUniqueInCollection(
        cateCollection,
        { name: req.body.name },
        'Such name already exists',
        categoryId
      );
      const category = {
        ...req.body,
        modifiedAt: new Date(Date.now()),
      };

      if (req.body.mainCategory !== null) {
        category.mainCategory = new ObjectId(req.body.mainCategory);
      }

      const result = await cateCollection.updateOne(
        { _id: new ObjectId(categoryId) },
        { $set: { ...category } }
      );
      res.status(200).json(result);
    } catch (error) {
      return res.status(error.code).json({ message: error.message });
    }
  }

  static async updateMainCategoryIsEnabled(req, res, next) {
    const categoryId = req.params.catId;

    const db = getDb();
    const cateCollection = db.collection('categories');
    try {
      // Validation is correct ObjectId
      Validator.validateIsValidObjectId(categoryId);

      // Validation id exists in collection
      await Validator.validateExistInCollection(
        cateCollection,
        categoryId,
        'Such A type not exists in collection'
      );

      const result = await cateCollection.updateOne(
        { _id: new ObjectId(categoryId) },
        { $set: { isEnabled: req.body.isEnabled } }
      );
      res.status(200).json(result);
    } catch (error) {
      return res.status(error.code).json({ message: error.message });
    }
  }

  static async getAllMainCategories(req, res, next) {
    const db = getDb();
    const cateCollection = db.collection('categories');
    try {
      const result = await cateCollection
        .aggregate([
          {
            $project: {
              _id: 1,
              name: 1,
              icon: 1,
              isEnabled: 1,
              isMainCategory: 1,
              mainCategory: 1,
              createdAt: {
                $dateToString: { format: '%d-%m-%Y', date: '$createdAt' },
              },
              updatedAt: {
                $dateToString: { format: '%d-%m-%Y', date: '$updatedAt' },
              },
            },
          },
        ])
        .toArray();
      res.status(200).json(result);
    } catch (error) {
      return res.status(error.code).json({ message: error.message });
    }
  }

  static async getAllEanbledMainCategories(req, res, next) {
    const db = getDb();
    const cateCollection = db.collection('categories');
    try {
      const result = await cateCollection
        .aggregate([
          { $match: { isEnabled: true, isMainCategory: true } },
          { $project: { label: '$name' } },
        ])
        .toArray();
      // console.log(result);

      res.status(200).json(result);
    } catch (error) {
      return res.status(error.code).json({ message: error.message });
    }
  }

  static async getMainCategoryByID(req, res, next) {
    const categoryId = req.params.catId;
    // console.log(categoryId);

    const db = getDb();
    const cateCollection = db.collection('categories');
    try {
      // Validation is correct ObjectId
      // await Validator.validateIsValidObjectId(categoryId);

      const result = await cateCollection
        .aggregate([{ $match: { _id: new ObjectId(categoryId) } }])
        .toArray();
      // console.log(result.shift());

      if (!result.length) throw new NotFoundException('There is such category');
      res.status(200).json(result.shift());
    } catch (error) {
      return res.status(error.code).json({ message: error.message });
    }
  }

  static async deleteCategory(req, res, next) {
    const categoryId = req.params.catId;
    const db = getDb();
    const cateCollection = db.collection('categories');
    try {
      // Validation is correct ObjectId
      await Validator.validateIsValidObjectId(categoryId);

      const result = await cateCollection.deleteOne({
        _id: new ObjectId(categoryId),
      });

      if (!result) throw new NotFoundException('There is such category');
      res.status(200).json(result);
    } catch (error) {
      return res.status(error.code).json({ message: error.message });
    }
  }

  static async getMenu(req, res, next) {
    const db = getDb();
    const cateCollection = db.collection('categories');
    try {
      const result = await cateCollection
        .aggregate([
          { $match: { isEnabled: true, isMainCategory: true } },
          {
            $lookup: {
              from: 'categories',
              let: { id: '$_id' },
              pipeline: [
                { $match: { $expr: { $eq: ['$mainCategory', '$$id'] } } },
                { $match: { isEnabled: true } },

                {
                  $project: {
                    name: 1,
                    icon: 1,
                    slug:1,
                    isEnabled: 1,
                    createdAt: 1,
                    modifiedAt: 1,
                  },
                },
              ],
              as: 'subCategories',
            },
          },
          { $match: { subCategories: { $gt: { $size: 1 } } } },
          {
            $project: {
              name: 1,
              icon: 1,
              isEnabled: 1,
              createdAt: 1,
              modifiedAt: 1,
              subCategories: 1,
            },
          },
        ])
        .toArray();
        res.status(200).json(result);
    } catch (error) {
      return res.status(error.code).json({ message: error.message });
    }
  }
}

module.exports = CategoryController;
