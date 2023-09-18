import React from 'react';

import { AppBar, Toolbar, Typography } from '@mui/material';

import Account from './account';

function Header() {
    return (
        <AppBar>
            <Toolbar>
                <Typography variant="h5" flexGrow={1}>magic monitor</Typography>
                <Account />
            </Toolbar>
        </AppBar>
    )
}

export default Header;