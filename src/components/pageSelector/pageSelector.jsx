import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SIDE_PAGES = 2; // < 1, 2, ... , 6, 7, 8, ... 19 , 20 >
const MIDDLE_PAGES = 3;

const PageSelector = ({ currentPage, maxPage, setFunction }) => {
    const generatePageNumbers = () => {
        console.log('Current page:', currentPage);
        console.log('Max page:', maxPage);
        let isAtBegin = currentPage <= SIDE_PAGES + MIDDLE_PAGES;
        let isAtEnd = currentPage >= maxPage - SIDE_PAGES - MIDDLE_PAGES + 1;
        let pages = [];
        if (isAtBegin) {
            for (let i = 1; i <= SIDE_PAGES + MIDDLE_PAGES + 1; i++) {
                pages.push(i);
            }
            pages.push('...');
            for (let i = maxPage - SIDE_PAGES + 1; i <= maxPage; i++) {
                pages.push(i);
            }
            return pages;
        }
        if (isAtEnd) {
            for (let i = 1; i <= SIDE_PAGES; i++) {
                pages.push(i);
            }
            pages.push('...');
            for (let i = maxPage - SIDE_PAGES - MIDDLE_PAGES; i <= maxPage; i++) {
                pages.push(i);
            }
            return pages;
        }
        for (let i = 1; i <= SIDE_PAGES; i++) {
            pages.push(i);
        }
        pages.push('...');
        for (let i = currentPage - MIDDLE_PAGES; i <= currentPage + MIDDLE_PAGES; i++) {
            pages.push(i);
        }
        pages.push('...');
        for (let i = maxPage - SIDE_PAGES + 1; i <= maxPage; i++) {
            pages.push(i);
        }

        return pages;
    };

    const pages = generatePageNumbers();

    return (
        <div className="flex">
            <Button className="m-1" onClick={() => setFunction(Math.max(currentPage - 1, 1))}>
                <FontAwesomeIcon icon={faCaretLeft} className='text-center' style={{ width: '24px' }} />
            </Button>
            {pages.map((page, index) => (
                <Button key={index} className={"m-1 " + (page == currentPage ? "bg-gray-300 text-gray-900" : "")} onClick={() => typeof page === 'number' && setFunction(page)}>
                    {page}
                </Button>
            ))}
            <Button className="m-1" onClick={() => setFunction(Math.min(currentPage + 1, maxPage))}>
                <FontAwesomeIcon icon={faCaretRight} className='text-center' style={{ width: '24px' }} />
            </Button>
        </div>
    );
};

export default PageSelector;