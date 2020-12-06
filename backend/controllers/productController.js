import pool from '../database/db.js'


//get all Products
const allProducts = async(req,res) => {
    try {
       const products = await pool.query("SELECT * FROM  products ");

        res.json(products.rows);
    } catch (error) {
        console.error(error.message);
    }
};

//get a product
const aProduct = async(req,res) => {
    try {
        const product = await pool.query("SELECT * FROM products WHERE product_id=$1",[req.params.id]);

        res.json(product.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
};

export { allProducts, aProduct }