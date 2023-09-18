import React, { useEffect, useState } from 'react';
import IoWebsocket from 'socket.io-client';

import { CssBaseline } from '@mui/material';

import './style/animation.css';

import { SocketProvider } from './context/socket';

import MonitorLayout from './components/layout';

function App(props) {
    const { config } = props;

    const [socket, setSocket] = useState();

    useEffect(() => {
        const ioSocket = IoWebsocket(config.serverUrl);
        setSocket(ioSocket);

        ioSocket.on("connect", () => {
            const message = `Successfully connected to ${config.serverUrl} as client: ${ioSocket.id}`;
            console.log(message);
        });

        return () => {
            ioSocket.close();
            setSocket(null);
        };
    }, [config.serverUrl]);

    return (
        <SocketProvider value={socket}>
            <CssBaseline />
            <MonitorLayout />
        </SocketProvider>
    );
}

export default App;