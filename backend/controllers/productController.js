import pool from '../database/db.js'


//get all Products
const allProducts = async(req,res) => {
    try {
    //    const products = await pool.query("SELECT * FROM  products ")
       const products = await pool.query("SELECT products.* , vendors.vendor_name FROM  products LEFT JOIN vendors ON products.vendor_id=vendors.vendor_id")

        res.json(products.rows)
    } catch (error) {
        console.error(error.message)
    }
}

//get a product
const aProduct = async(req,res) => {
    try {
        // const product = await pool.query("SELECT * FROM products WHERE product_id=$1",[req.params.id])
        const product = await pool.query("SELECT products.* , vendors.vendor_name FROM  products LEFT JOIN vendors ON products.vendor_id=vendors.vendor_id  WHERE product_id=$1",[req.params.id])

        res.json(product.rows[0])
    } catch (error) {
        console.error(error.message)
    }
}

// get vendor products

const vendorProducts = async(req,res) => {
    try {
        const productsVendor = await pool.query("SELECT * FROM products WHERE vendor_id=$1",[req.params.id])

        res.json(productsVendor.rows)
        
    } catch (error) {
        console.error(error.message)
    }
}

export { allProducts, aProduct, vendorProducts }