import React, { useCallback } from 'react';
import moment from 'moment';

import { IconButton, Toolbar, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

function HeaderToolbar(props) {
    const { selectedInterface, selectedDate, onDateChange, collapsed, onExpandClick } = props;

    const handleBackClick = useCallback(() => {
        const newValue = moment(selectedDate).subtract(1, 'day');
        onDateChange(newValue);
    }, [onDateChange, selectedDate]);
    const handleChange = useCallback((newValue) => {
        onDateChange(newValue);
    }, [onDateChange]);
    const handleForwardClick = useCallback(() => {
        const newValue = moment(selectedDate).add(1, 'day');
        onDateChange(newValue);
    }, [onDateChange, selectedDate]);

    return (
        <Toolbar>
            {collapsed && <IconButton onClick={onExpandClick}>
                <ChevronRight />
            </IconButton>}
            <Typography flexGrow={1} noWrap>{selectedInterface}</Typography>
            <IconButton onClick={handleBackClick}>
                <ChevronLeft />
            </IconButton>
            <DatePicker
                sx={{ width: '120px' }}
                slotProps={{ textField: { variant: 'standard' } }}
                value={selectedDate}
                onChange={handleChange}
            />
            <IconButton onClick={handleForwardClick}>
                <ChevronRight />
            </IconButton>
        </Toolbar>
    )
}

export default HeaderToolbar;