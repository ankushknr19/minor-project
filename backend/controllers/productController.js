import { query } from 'express'
import pool from '../database/db.js'
import asyncHandler from 'express-async-handler'
import path from 'path'

// @desc    get all products
// @route   GET /api/products
// @access  Public
const allProducts = async(req,res) => {
    try {
    //    const products = await pool.query("SELECT * FROM  products ")
       const products = await pool.query("SELECT products.* , vendors.vendor_name FROM  products LEFT JOIN vendors ON products.vendor_id=vendors.vendor_id")

        res.json(products.rows)
    } catch (error) {
        console.error(error.message)
    }
}

// @desc    get a product
// @route   GET /api/products/:id
// @access  Public
const aProduct = async(req,res) => {
    try {
        // const product = await pool.query("SELECT * FROM products WHERE product_id=$1",[req.params.id])
        const product = await pool.query("SELECT products.* , vendors.vendor_name FROM  products LEFT JOIN vendors ON products.vendor_id=vendors.vendor_id  WHERE product_id=$1",[req.params.id])

        if (product.rows[0]==0) {
            res.status(404)
            throw new Error('Product not found')
        } else {
            res.json(product.rows[0])
        }
    } catch (error) {
        console.error(error.message)
    }
}

// @desc    get vendor products
// @route   GET /api/vendors
// @access  Public

const vendorProducts = async(req,res) => {
    try {
        const productsVendor = await pool.query("SELECT * FROM products WHERE vendor_id=$1",[req.params.id])

        if (productsVendor.rows[0] == 0) {
            res.status(404)
            throw new Error('Products not found')
        } else {
            res.json(productsVendor.rows)
        }
        
    } catch (error) {
        console.error(error.message)
    }
}

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/vendor
const deleteProduct = asyncHandler(async (req, res) => {
    try {
        const product = await pool.query("SELECT * FROM products WHERE product_id=$1",[req.params.id])
        if (product.rows[0]==0) {
            res.status(404)
            throw new Error('Product not found')
        } else {
            const deletedProduct = await pool.query("DELETE FROM products WHERE product_id=$1",[req.params.id])

            res.json({ message: 'Product removed' })
        }
    } catch (error) {
        console.error(error.message)
    }

})
// @desc    Delete a product by vendor
// @route   DELETE /api/products/:id
// @access  Private/vendor
const deleteVendorProduct = asyncHandler(async (req, res) => {
    try {
        const product = await pool.query("SELECT * FROM products WHERE product_id=$1 AND vendor_id=$2",
        [
            req.params.id,
            req.vendor.rows[0].vendor_id
        ])
        if (product.rows[0]==0) {
            res.status(404)
            throw new Error('Product not found')
        } else {
            const deletedProduct = await pool.query("DELETE FROM products WHERE product_id=$1 AND vendor_id=$2",
            [
                req.params.id,
                req.vendor.rows[0].vendor_id
            ])

            res.status(201).json({ message: 'Product removed' })
        }
    } catch (error) {
        console.error(error.message)
    }

})


// @desc    Create a product
// @route   POST /api/products
// @access  Private/vendor
const addProduct = async (req, res) => {
    try {
        const createdProduct = await pool.query(` INSERT INTO products
        (product_name, product_image, product_description, product_price, count_in_stock, vendor_id )
        VALUES($1,$2,$3,$4,$5,$6) RETURNING * `,
        [
            req.body.name,
            req.body.image,
            req.body.description,
            req.body.price,
            req.body.count_in_stock,
            req.vendor.rows[0].vendor_id
        ])

        res.status(201).json(createdProduct.rows[0])
        
    } catch (error) {
        console.error(error.message)
    }
}

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/vendor
const updateProduct = asyncHandler(async (req, res) => {
    try {

        const searchDb = await pool.query("SELECT * FROM products WHERE product_id=$1",[req.params.id])

        if (searchDb.rows[0].length==0) {
            res.status(404)
            throw new Error('Product not found')
        } else {
            
            const updatedProduct = await pool.query("UPDATE TABLE products SET product_name=$1, product_image=$2, product_description=$3, product_price=$4, count_in_stock=$5 WHERE product_id=$6",
            [
                req.body.name,
                req.body.image,
                req.body.description,
                req.body.price,
                req.body.countInStock,
                req.params.id
            ])

            res.status(201).json(updatedProduct.rows[0])
        }
    } catch (error) {
        console.error(error.message)
    }
})

export { allProducts, aProduct, vendorProducts, addProduct, updateProduct, deleteProduct, deleteVendorProduct }