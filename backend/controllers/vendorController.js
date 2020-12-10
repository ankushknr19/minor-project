import pool from '../database/db.js'


//get all vendors
const allVendors = async(req,res) => {
    try {
       const vendors = await pool.query("SELECT * FROM  vendors ")

        res.json(vendors.rows);
    } catch (error) {
        console.error(error.message);
    }
};

//get a vendor
const aVendor = async(req,res) => {
    try {
        const vendor = await pool.query("SELECT * FROM vendors WHERE vendor_id=$1",[req.params.id]);
        // const vendor = await pool.query("SELECT vendors.* , vendors.vendor_name FROM  vendors LEFT JOIN vendors ON vendors.vendor_id=vendors.vendor_id  WHERE vendor_id=$1",[req.params.id]);

        res.json(vendor.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
};

export { allVendors, aVendor }