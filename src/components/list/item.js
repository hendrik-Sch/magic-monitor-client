import React, { Fragment, useCallback, useContext, useEffect, useState } from 'react';

import { Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import { PlayCircleOutlined, StopCircle } from '@mui/icons-material';

import SocketContext from '../../context/socket';

import LoadingIconButton from '../loadingIconButton';
import StatusIcon from './statusIcon';

function InterfaceListItem(props) {
    const { item, selected, onClick } = props;

    const theme = useTheme();
    const socket = useContext(SocketContext);

    const { name, idle, running, stopRequested, startRequested } = item;

    const [stopRequestedState, setStopRequestedState] = useState(stopRequested);
    const [startRequestedState, setStartRequestedState] = useState(startRequested);

    useEffect(() => {
        if (idle) {
            setStartRequestedState(false);
        } else {
            setStopRequestedState(false);
        }
    }, [item]);

    const handleClick = useCallback(() => {
        onClick(item);
    }, [onClick, item]);
    const handleStopClick = useCallback(() => {
        setStopRequestedState(true);
        socket.emit('interface:stop', name);
    }, [name]);
    const handleStartClick = useCallback(() => {
        setStartRequestedState(true);
        socket.emit('interface:start', name);
    }, [name]);

    let secondaryAction = null;

    if (idle) {
        const buttonSx = {
            color: 'initial',
            "&:hover": {
                color: theme.palette.error.main
            }
        };
        secondaryAction = <LoadingIconButton onClick={handleStopClick} edge="end" color='error' disabled={running} loading={stopRequestedState} sx={buttonSx}>
            <StopCircle />
        </LoadingIconButton>;
    } else {
        const buttonSx = {
            color: 'initial',
            "&:hover": {
                color: theme.palette.success.main
            }
        };
        secondaryAction = <LoadingIconButton onClick={handleStartClick} edge="end" color='success' loading={startRequestedState} sx={buttonSx}>
            <PlayCircleOutlined />
        </LoadingIconButton>;
    }

    return (
        <Fragment>
            <ListItem secondaryAction={secondaryAction} disablePadding>
                <ListItemButton onClick={handleClick} selected={selected}>
                    <ListItemIcon>
                        <StatusIcon idle={idle} running={running} />
                    </ListItemIcon>
                    <ListItemText primaryTypographyProps={{ noWrap: true }}>{name}</ListItemText>
                </ListItemButton>
            </ListItem>
            <Divider />
        </Fragment>
    )
}

export default InterfaceListItem;