import React from 'react';

import { IconButton, Toolbar } from '@mui/material';
import { ChevronLeft } from '@mui/icons-material';

import ListFilter from './filter';
import ListSearch from './search';

function ListToolbar(props) {
    const { searchValue, onSearch, filterValue, onFilterChange, onCollapseClick } = props;

    return (
        <Toolbar disableGutters sx={{ display: 'flex' }}>
            <IconButton onClick={onCollapseClick} sx={{ marginRight: 3 }}>
                <ChevronLeft />
            </IconButton>
            <ListSearch
                searchValue={searchValue}
                onSearch={onSearch}
            />
            <ListFilter
                filterValue={filterValue}
                onFilterChange={onFilterChange}
            />
        </Toolbar>
    )
}

export default ListToolbar;