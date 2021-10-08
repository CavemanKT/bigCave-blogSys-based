const { Wishlist } = require('../../../models')

module.exports = function(format) {
  return async function (req, res, next) {
    const { params: { id } } = req
    const wishlist = await Wishlist.findOne({
      where: { id: Number(id) || 0 },
      include: {
        association: Wishlist.WishlistItems
      },
      order: [['WishlistItems', 'createdAt', 'DESC']]
    })

    if (!wishlist) {
      if (format === 'modal') {
        return res.render('api/wishlists/not-found', { layout: false })
      }

      if (format === 'json') {
        return res.status(404).json({ message: `Wishlist of ID ${id} not found!` })
      }
    }

    res.locals.currentWishlist = wishlist

    next()
  }
}
