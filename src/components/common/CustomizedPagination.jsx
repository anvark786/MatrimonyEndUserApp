import { Pagination } from "react-bootstrap";
import React, { useState } from 'react';


const CustomizedPagination = ({totalPages,setPage}) => {

    console.log("total-pag",totalPages);
    const [currentPage, setCurrentPage] = useState(1);   
    const handlePageChange = (page) => {
        setCurrentPage(page);
        setPage(page)
    };
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

export default CustomizedPagination;