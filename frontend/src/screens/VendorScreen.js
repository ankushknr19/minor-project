import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listVendorDetails} from '../actions/vendorActions'
import { Row } from 'react-bootstrap'

const VendorScreen = ({match}) => {

    const dispatch = useDispatch()

    
  const vendorDetails = useSelector(state => state.vendorDetails)
  const { loading, error, vendor } = vendorDetails

    useEffect( () => {
            dispatch(listVendorDetails(match.params.id))
    },[dispatch,match])

    return (
        <>
        { loading
            ? (<Loader />)
            : error
            ? ( <Message variant='danger'>{error}</Message> )
            : ( <Row>
                    <h2>I am {vendor.name} </h2>
                </Row>
              )
        }
        </>
        
    )
}

export default VendorScreen
