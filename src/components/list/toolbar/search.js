import React, { useCallback } from 'react';

import { IconButton, InputAdornment, TextField/* , useTheme */ } from '@mui/material';
import { Clear } from '@mui/icons-material';

function ListSearch(props) {
    const { searchValue, onSearch } = props;

    // const theme = useTheme();

    const clearInput = useCallback(() => {
        onSearch();
    }, [onSearch]);

    const handleChange = useCallback(({ target: { value } }) => {
        onSearch(value);
    }, [onSearch]);

    let endAdornment = null;
    if (searchValue) {
        endAdornment = <InputAdornment position="end">
            <IconButton
                onClick={clearInput}
                size="small"
                edge="end"
            >
                <Clear />
            </IconButton>
        </InputAdornment>;
    }

    return (
        <TextField
            label="Suche ..."
            variant='standard'
            size="small"
            value={searchValue || ""}
            onChange={handleChange}
            fullWidth
            // sx={{
            //     '& .MuiInputBase-input': {
            //         transition: theme.transitions.create('width'),
            //         width: '75px',
            //         '&:focus': {
            //             width: '200px',
            //         }
            //     }
            // }}
            InputProps={{
                endAdornment
            }}
        />
    )
}

export default ListSearch;