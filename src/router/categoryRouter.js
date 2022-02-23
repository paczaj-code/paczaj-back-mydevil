const mainCategorySchema = require("../schema/mainCategorySchema.js");
const { checkSchema } = require("express-validator");
const CategoryController = require("../controller/categoryController.js");
const { Router } = require("express");

const router = Router();

router.post("/main-category", checkSchema(mainCategorySchema), CategoryController.createMainCategory);
router.put("/main-category/:catId", checkSchema(mainCategorySchema), CategoryController.updateMainCategory);
router.patch("/main-category/:catId", checkSchema(mainCategorySchema), CategoryController.updateMainCategoryIsEnabled);
router.get("/main-category", CategoryController.getAllMainCategories);
router.get("/main-category/:catId", CategoryController.getMainCategoryByID);
router.get("/main-category-only-main-enabled", CategoryController.getAllEanbledMainCategories);
router.delete("/main-category/:catId", CategoryController.deleteCategory);
router.get("/get-menu", CategoryController.getMenu);

module.exports = router;
