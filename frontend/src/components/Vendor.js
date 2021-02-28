import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardDeck, Jumbotron } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'

const Vendor = ({vendor}) => {
    return (
            <>
        <Link to={`/vendors/${vendor.vendor_id}`}>
            { vendor?.vendor_logo == null ? (
                <CardDeck>
                <Card className='my-3 p-3 rounded'>
                    <Jumbotron fluid>
                    <Card.Body>
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
                    </Card.Body>
                    </Jumbotron>
                </Card>    
                </CardDeck>
            ) : (
                <Image src = {`${vendor.vendor_logo}`} thumbnail/>
            )}
            
        </Link>
            </>
    )
}

export default Vendor
