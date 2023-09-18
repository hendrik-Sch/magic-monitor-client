import React, { useCallback, useState } from 'react';
import { Box, Container, useTheme } from '@mui/material';

import Header from '../header';
import InterfaceList from '../list';
import DetailView from '../detail';

function MonitorLayout() {
    const theme = useTheme();

    const [selectedInterface, setSelectedInterface] = useState();
    const [showList, setShowList] = useState(true);

    const handleCollapseClick = useCallback(() => {
        setShowList(false);
    }, []);
    const handleExpandClick = useCallback(() => {
        setShowList(true);
    }, []);

    const listSx = {
        transition: theme.transitions.create('width'),
        overflow: 'hidden',
        width: showList ? '400px' : 0
    };

    return (
        <Box>
            <Header />
            <Container maxWidth='xl' sx={{
                height: 'calc(100vh - 64px)',
                marginTop: '64px',
                paddingBottom: '24px',
                overflowY: 'auto',
                display: 'flex'
            }}>
                <Box sx={listSx}>
                    <InterfaceList
                        selectedItem={selectedInterface}
                        onSelectionChange={setSelectedInterface}
                        onCollapseClick={handleCollapseClick}
                    />
                </Box>
                <Box sx={{ flex: 1, overflow: 'hidden' }}>
                    <DetailView
                        selectedInterface={selectedInterface}
                        collapsed={!showList}
                        onExpandClick={handleExpandClick}
                    />
                </Box>
            </Container>
        </Box>
    )
}

export default MonitorLayout;