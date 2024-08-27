const productsService = require('../service/products-service');

class ProductController {
  async getPaginationProducts(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const category = req.query.category;
      const limit = parseInt(req.query.limit) || 10;
      const data = await productsService.getPagination(page, limit, category);
      return res.json(data);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new ProductController();