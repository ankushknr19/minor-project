import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardDeck, Jumbotron } from 'react-bootstrap'

const Vendor = ({vendor}) => {
    return (
            <>
        <Link to={`/vendors/${vendor.vendor_id}`}>
            <CardDeck>
            <Card className='my-3 p-3 rounded'>
                <Jumbotron fluid>
                <Card.Text as= 'h4'
                style={{
                 width: '100px',
                 height: '100px',
                 margin: 'auto',
                 display: 'grid'
                }}
                >
                    {vendor.vendor_name}
                </Card.Text>
                </Jumbotron>
            </Card>    
            </CardDeck>
        </Link>
            </>
    )
}

export default Vendor
