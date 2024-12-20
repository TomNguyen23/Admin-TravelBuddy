import React, { useState, useEffect } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const RightSearch = ({setValue, setSubmit}) => {
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = (e) => {
        setSearchValue(e.target.value);
        setValue(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmit(true);
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-1">
            <Input type="text" placeholder="Tìm kiếm" onChange={handleSearch} />
            <Button type="submit">
                <FontAwesomeIcon icon={faMagnifyingGlass} size='lg' style={{ width: '24px' }} />
            </Button>
        </form>
    )
}

export default RightSearch;