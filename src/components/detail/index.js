import { Box } from '@mui/material';
import React, { useState } from 'react';
import moment from 'moment';

import HeaderToolbar from './headerToolbar';

import LogViewer from './logViewer';

function DetailView(props) {
    const { selectedInterface, collapsed, onExpandClick } = props;

    const [selectedDate, setSelectedDate] = useState(moment());

    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <HeaderToolbar
                selectedInterface={selectedInterface}
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                collapsed={collapsed}
                onExpandClick={onExpandClick}
            />
            <LogViewer
                selectedInterface={selectedInterface}
                selectedDate={selectedDate}
            />
        </Box>
    )
}

export default DetailView;