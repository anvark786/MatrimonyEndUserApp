// AccessRequests.js

import React, { useState ,useEffect} from 'react';
import { Tabs, Tab, Table, Button, Pagination, Badge } from 'react-bootstrap';
import { formatDateTimeToDateString,calculateTimeElapsed } from '../../common/CommonFunctions';
import { Link } from 'react-router-dom';

const AccessRequests = ({ recivedRequests, pageLimit ,setPage,totalRecivedDataCounts,manageRequests,sentRequests,totalSentDataCounts}) => {


    const [key, setKey] = useState('received'); 
    const [currentPage, setCurrentPage] = useState(1);   
    const itemsPerPage = pageLimit; 

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
        console.log("requests",requests,key);
        if(requests.length>0){            
            return requests.map((request, index) => (
                <tr key={index}>
                    {key=="received"&&<td><Link to={`/profile/details/${request?.profile_requester_uuid}/`}>{request?.profile_requester_name}</Link></td>}
                    {key=="submitted"&&<td><Link to={`/profile/details/${request?.profile_owner_uuid}/`}>{request?.profile_owner_name}</Link></td>}

                    <td>{formatDateTimeToDateString(request?.created_at)}</td>
                    <td>
                        <Badge bg={getStatusVariant(request?.status)}>{request?.status_display}</Badge>
                    </td>
                    {key=="received"&&<td>
                        {request?.status=="pending"?<>
                        <Button variant="success" className='me-3' onClick={() => manageRequests('accept', request?.id)}>
                            Accept
                        </Button>
                        <Button variant="danger" onClick={() => manageRequests('reject', request?.id)}>
                            Reject
                        </Button>
                        </>:<span className="text-muted" style={{fontSize:"12px"}}>{"Action taken at "+calculateTimeElapsed(request?.updated_at)}</span>}
                    </td>} 
                    {key=="submitted"&&request?.status!=="pending"&&<td><span className="text-muted" style={{fontSize:"12px"}}>{"Your request was "+request?.status+" "+calculateTimeElapsed(request?.updated_at)}</span></td>} 
                </tr>
            ));
        

        }
        else{
            return <h5>No requests received yet!.</h5>
        }
            
    };
    const totalSentPages = Math.ceil(totalSentDataCounts / itemsPerPage);
    const totalReceivedPages = Math.ceil(totalRecivedDataCounts / itemsPerPage);

    console.log("totalReceivedPages",totalReceivedPages);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        setPage(page)
    };

    const renderPagination = (totalPages) => {

        console.log("total-pag",totalPages);
        return (
            totalPages>0&&<Pagination>
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
                            <th>Requested Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>}
                    <tbody>{renderTableData(recivedRequests)}</tbody>
                </Table>
                {renderPagination(totalReceivedPages)}
            </Tab>
            <Tab eventKey="submitted" title="You Submitted Requests Status">
                <Table striped bordered hover>
                    {<thead>
                        <tr>
                            <th>User Profile</th>
                            <th>Requested Date</th>
                            <th>Status</th>
                            <th>Note</th>
                        </tr>
                    </thead>}
                    <tbody>{renderTableData(sentRequests)}</tbody>
                </Table>
                {renderPagination(totalSentPages)}
            </Tab>
        </Tabs>
    );
};

export default AccessRequests;
