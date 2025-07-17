const router = require("express").Router();
const { createProductController, getAllProductsController, updateProductController,
    deleteProductController, getProductByIdController,  getTrendingProductsController, getPopularProductsController, 
    getProductsByCategoryController, SearchProductController} = require('../Controllers/ProductController.js')
const upload = require("../Middlewares/Upload.js");
const checkProfile = require("../Middlewares/checkprofile");
const isAdmin = require('../Middlewares/isAdmin');

router.post("/create", checkProfile, isAdmin, upload.single("image"), createProductController);
router.get("/", getAllProductsController);
router.get("/trending", getTrendingProductsController);
router.get("/popular", getPopularProductsController);
router.get("/category/:category", getProductsByCategoryController);
router.put('/update/:id', checkProfile, isAdmin, upload.single("image"), updateProductController);
router.delete("/delete/:id", checkProfile, isAdmin, deleteProductController);
router.get("/get/:id", getProductByIdController);
router.get("/search", SearchProductController);

router.post("/img", upload.array("images", 4), (req, res) => {
    console.log(req.file);
    let data = req.files.map((img, i) => {
        return img.filename
    })
    res.json({ images: data })
})

router.post("/images", upload.fields([{ name: "img", maxCount: 10 },
{ name: "banner" }]), (req, res) => {
    res.json({ images: req.files })
});

module.exports = router