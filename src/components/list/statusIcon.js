import React from 'react';

import { ChangeCircle, Circle } from '@mui/icons-material';

function StatusIcon(props) {
    const { idle, running } = props;

    if (running) {

        return <ChangeCircle className='rotate-clockwise' color='success' />;
    }

    if (idle) {

        return <Circle color='success' />;
    }

    return <Circle color='error' />;
}

export default StatusIcon;