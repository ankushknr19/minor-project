import React from 'react'
import { Link } from 'react-router-dom'
// import { Card } from 'react-bootstrap'

const Vendor = ({vendor}) => {
    return (
        <Link to={`/vendors/${vendor.vendor_id}`}>
            <>
                <h4>{vendor.vendor_name}</h4>
            </>
        </Link>
    )
}

export default Vendor
