import React, { useEffect } from 'react'
import { Jumbotron, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'

const AdminHomeScreen = ({history}) => {

    const userLogin = useSelector(state => state.userLogin)
    const {useInfo} = userLogin

    useEffect(() => {
        // if(!useInfo || !useInfo?.is_admin){
        //     history.push('/login')
        // }
    }, [useInfo, history])

    return (
        <>
            <Row>
                <center><h1>Welcome Admin</h1></center>
        </Row>
        <Row>
                <LinkContainer to='/orders'>
                    <Jumbotron>
                        <h2> Manage Orders </h2>
                    </Jumbotron>
                </LinkContainer>
        </Row>
        </>
    )
}

export default AdminHomeScreen
