import React, { useCallback, useContext, useEffect, useState } from 'react'

import { Box, List } from '@mui/material';

import InterfaceListItem from './item';
import LoadingLabel from './loadingLabel';
import EmptyLabel from './emptyLabel';

import SocketContext from '../../context/socket';
import ListToolbar from './toolbar/';



function InterfaceList(props) {
    const { selectedItem, onSelectionChange, onCollapseClick } = props;

    const socket = useContext(SocketContext);

    const [interfaces, setInterfaces] = useState();
    const [searchValue, setSearchValue] = useState();
    const [filterValue, setFilterValue] = useState({
        stopped: true,
        idle: true,
        running: true
    });

    useEffect(() => {
        if (socket) {
            socket.on('interfaces:list', newInterfaces => {
                setInterfaces(newInterfaces);
            });

            socket.emit('interfaces:list');
        }
    }, [socket]);

    const handleClick = useCallback((item) => onSelectionChange(item.name), [onSelectionChange]);

    if (!Array.isArray(interfaces)) {

        return <LoadingLabel />;
    }

    if (interfaces.length <= 0) {

        return <EmptyLabel />
    }

    const filterFunc = (item) => {
        if (searchValue) {
            const name = String(item.name).toLowerCase();
            const val = String(searchValue).toLowerCase();

            if (!name.includes(val)) {

                return false;
            }
        }

        if (!filterValue.running && item.running) {

            return false;
        }

        if (!filterValue.idle && item.idle && !item.running) {

            return false;
        }

        if (!filterValue.stopped && !item.idle) {

            return false;
        }

        return true;
    };

    const filteredInterfaces = interfaces
        .filter(filterFunc);

    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <ListToolbar
                searchValue={searchValue}
                onSearch={setSearchValue}
                filterValue={filterValue}
                onFilterChange={setFilterValue}
                onCollapseClick={onCollapseClick}
            />
            <List sx={{ overflowY: 'auto', overflowX: 'hidden', flex: 1 }}>
                {filteredInterfaces.map(item => (
                    <InterfaceListItem
                        key={item.name}
                        item={item}
                        selected={selectedItem === item.name}
                        onClick={handleClick}
                    />
                ))}
            </List>
        </Box>
    )
}

export default InterfaceList;