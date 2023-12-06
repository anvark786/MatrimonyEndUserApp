// AccessRequests.js

import React, { useState ,useEffect} from 'react';
import { Tabs, Tab, Table, Button, Pagination, Badge } from 'react-bootstrap';
import { formatDateTimeToDateString } from '../../common/CommonFunctions';
import { Link } from 'react-router-dom';

const AccessRequests = ({ recivedRequests, pageLimit ,setPage,totalRecivedDataCounts}) => {

    console.log("recivedRequests",recivedRequests);
    const [key, setKey] = useState('received'); // Default active tab
    const [currentPage, setCurrentPage] = useState(1);   
    const itemsPerPage = pageLimit; // Adjust the number of items per page as needed

    useEffect(() => {
        renderTableData(recivedRequests)
      }, [recivedRequests]);

    const getStatusVariant = (status) => {
        console.log("ststusss", status);
        if (status) {
            switch (status) {
                case 'pending':
                    return 'warning';
                case 'approved':
                    return 'success';
                case 'declined':
                    return 'danger';
                default:
                    return 'light';
            }

        }

    };

    const renderTableData = (requests) => {
        if(requests.length>0){  
            const startIndex = (currentPage - 1) * itemsPerPage;    
            const endIndex = startIndex + itemsPerPage;
            const currentRequests = requests.slice(startIndex, endIndex);

            return requests.map((request, index) => (
                <tr key={index}>
                    <td><Link to={`/profile/details/${request?.profile_requester_uuid}/`}>{request?.profile_requester_name}</Link></td>
                    <td>{formatDateTimeToDateString(request?.created_at)}</td>
                    <td>
                        <Badge bg={getStatusVariant(request?.status)}>{request?.status_display}</Badge>
                    </td>
                    <td>
                        {request?.status=="pending"&&<>
                        <Button variant="success" className='me-3' onClick={() => handleAction('accept', index + startIndex)}>
                            Accept
                        </Button>
                        <Button variant="danger" onClick={() => handleAction('reject', index + startIndex)}>
                            Reject
                        </Button>
                        </>}
                    </td>   
                </tr>
            ));
        

        }
        else{
            return <h5>No requests received yet!.</h5>
        }
            
    };

    const handleAction = (action, index) => {
        // Handle accept/reject action here based on the action and index
        console.log(`${action} request at index ${index}`);
    };

    const submittedRequests = [
        { name: 'User A', date: '2023-02-01' },
        { name: 'User B', date: '2023-02-02' },
        // Add more received requests
    ];

    // let recivedRequests = []
    // if(recivedRequests){
    //     recivedRequests = recivedRequests
    // }
    const totalSubmittedPages = Math.ceil(submittedRequests.length / itemsPerPage);
    const totalReceivedPages = Math.ceil(totalRecivedDataCounts / itemsPerPage);

    console.log("totalReceivedPages",totalReceivedPages);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        setPage(page)
    };

    const renderPagination = (totalPages) => {
        return (
            <Pagination>
                <Pagination.First onClick={() => handlePageChange(1)} />
                <Pagination.Prev
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                />

                {Array.from({ length: totalPages }).map((_, index) => (
                    <Pagination.Item
                        key={index}
                        active={index + 1 === currentPage}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}

                <Pagination.Next
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                />
                <Pagination.Last onClick={() => handlePageChange(totalPages)} />
            </Pagination>
        );
    };

    return (
        <Tabs
            id="access-requests-tabs"
            activeKey={key}
            onSelect={(k) => {
                setKey(k);
                setCurrentPage(1); // Reset to the first page when changing tabs
            }}
            className="mb-3"
        >
            <Tab eventKey="received" title="Request Received">
                <Table striped bordered hover>
                   {recivedRequests.length>0&&<thead>
                        <tr>
                            <th>User Profile</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>}
                    <tbody>{renderTableData(recivedRequests)}</tbody>
                </Table>
                {renderPagination(totalReceivedPages)}
            </Tab>
            <Tab eventKey="submitted" title="Request Sent">
                <Table striped bordered hover>
                    {<thead>
                        <tr>
                            <th>User Profile</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>}
                    <tbody>{renderTableData(submittedRequests)}</tbody>
                </Table>
                {renderPagination(totalSubmittedPages)}
            </Tab>
        </Tabs>
    );
};

export default AccessRequests;
