import React, { Fragment, useCallback, useState } from 'react';

import { IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, Switch } from '@mui/material';
import { FilterAlt } from '@mui/icons-material';

function ListFilter(props) {
    const { filterValue, onFilterChange } = props;

    const [anchorEl, setAnchorEl] = useState();

    const handleClick = useCallback(({ target }) => {
        setAnchorEl(target);
    }, []);
    const handleClose = useCallback(() => setAnchorEl(null), []);
    const handleStoppedChange = useCallback(() => {
        onFilterChange({
            ...filterValue,
            stopped: !filterValue.stopped
        });
    }, [onFilterChange, filterValue]);
    const handleIdleChange = useCallback(() => {
        onFilterChange({
            ...filterValue,
            idle: !filterValue.idle
        });
    }, [onFilterChange, filterValue]);
    const handleRunningChange = useCallback(() => {
        onFilterChange({
            ...filterValue,
            running: !filterValue.running
        });
    }, [onFilterChange, filterValue]);

    const open = Boolean(anchorEl);
    const { stopped, idle, running } = filterValue;

    return (
        <Fragment>
            <IconButton onClick={handleClick}>
                <FilterAlt />
            </IconButton>
            <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
                <ListItem dense>
                    <ListItemButton onClick={handleStoppedChange} dense>
                        <ListItemIcon>
                            <Switch
                                disableRipple
                                checked={stopped}
                            // onChange={}
                            />
                        </ListItemIcon>
                        <ListItemText>Gestoppt</ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton onClick={handleIdleChange} dense>
                        <ListItemIcon>
                            <Switch
                                disableRipple
                                checked={idle}
                            // onChange={}
                            />
                        </ListItemIcon>
                        <ListItemText>Idle</ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton onClick={handleRunningChange} dense>
                        <ListItemIcon>
                            <Switch
                                disableRipple
                                checked={running}
                            // onChange={}
                            />
                        </ListItemIcon>
                        <ListItemText>Aktiv</ListItemText>
                    </ListItemButton>
                </ListItem>
            </Menu>
        </Fragment>
    )
}

export default ListFilter;