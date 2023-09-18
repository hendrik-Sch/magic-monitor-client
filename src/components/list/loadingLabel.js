import React, { Fragment } from 'react';

import { Box, CircularProgress, Skeleton } from '@mui/material'

function LoadingLabel() {
    return (
        <Fragment>
            {[...Array(10).keys()].map((entry, index) => (
                <Skeleton key={index} animation="wave" height={48} />
            ))}
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
            </Box>
        </Fragment>
    )
}

export default LoadingLabel;