import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

const Vendor = ({vendor}) => {
    return (
            <>
        <Link to={`/vendors/${vendor.vendor_id}`}>
            <Card>
                <Card.Text as='h4'
                style={{
                    width: '100px',
                    height: '50px',
                    margin: '10px auto',
                    display: 'block'
                  }}
                >
                     {vendor.vendor_name}
                </Card.Text>
            </Card>    
        </Link>
            </>
    )
}

export default Vendor
