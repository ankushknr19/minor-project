import React from 'react'
import { Link } from 'react-router-dom'
// import { Card } from 'react-bootstrap'

const Vendor = ({vendor}) => {
    return (
        <Link to={`/vendors/${vendor._id}`}>
            <>
                <h4>{vendor.name}</h4>
            </>
        </Link>
    )
}

export default Vendor
