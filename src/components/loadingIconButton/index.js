import React, { forwardRef, useEffect, useRef, useState } from 'react';

import { CircularProgress, IconButton, useTheme } from '@mui/material';

function LoadingIconButton(props, ref) {
    const { loading, disbaled, children, ...others } = props;

    const theme = useTheme();
    const timeOut = useRef();

    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        clearTimeout(timeOut.current);

        if (loading) {
            timeOut.current = setTimeout(() => {
                setLoading(true);
            }, 300);
        } else {
            setLoading(false);
        }

        return () => clearTimeout(timeOut.current);
    }, [loading]);

    return (
        <IconButton
            ref={ref}
            disabled={loading || disbaled}
            {...others}>
            {isLoading &&
                <CircularProgress
                    size={48}
                    sx={{
                        color: theme.palette.action.disabled,
                        position: 'absolute',
                        zIndex: 1,
                        padding: theme.spacing()
                    }}
                />
            }
            {children}
        </IconButton>
    )
}

export default forwardRef(LoadingIconButton);