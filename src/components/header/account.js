import React, { useCallback } from 'react'

import { AccountCircle } from '@mui/icons-material';
import { IconButton } from '@mui/material'

function Account() {
    const handleMenu = useCallback(() => {

    }, []);

    return (
        <IconButton
            size="large"
            onClick={handleMenu}
            color="inherit"
        >
            <AccountCircle />
        </IconButton>
    )
}

export default Account
