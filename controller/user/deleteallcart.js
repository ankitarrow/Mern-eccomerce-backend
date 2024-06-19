const addToCartModel = require("../../models/cartProduct");

const deleteallcart = async (req, res) => {
    try {
        const userId = req.userId;

        // Use deleteMany to delete all cart products for a user
        const result = await addToCartModel.deleteMany({ userId: userId });

        res.json({
            data: result.deletedCount,
            message: "ok",
            error: false,
            success: true
        });
    } catch (error) {
        res.json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
}

module.exports = deleteallcart;
