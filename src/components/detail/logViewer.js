import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { DataGrid } from '@mui/x-data-grid';

import SocketContext from '../../context/socket';

const columns = [
    { field: 'job', headerName: 'Job ID', width: 150 },
    {
        field: 'Timestamp', headerName: 'Zeitpunkt', width: 120, type: 'dateTime',
        valueGetter: (params) => {
            if (!params.row.Timestamp) {
                return "";
            }

            return moment(params.row.Timestamp).toDate()/* .format('HH:mm:ss SSS') */;
        },
        valueFormatter: (params) => moment(params.value).format('HH:mm:ss SSS')
    },
    {
        field: 'TypeID', headerName: 'Level', width: 100, type: 'number',
        valueFormatter: (params) => {
            if (!params.value) {
                return "";
            }

            switch (params.value) {
                case 0:
                    return "Unknown";
                case 1:
                    return "Trace";
                case 2:
                    return "Debug";
                case 3:
                    return "Info";
                case 4:
                    return "Warning";
                case 5:
                    return "Error";
                case 6:
                    return "Fatal";

                default:
                    return "";
            }
        }
    },
    { field: 'MsgDescription', headerName: 'Nachricht', width: 1000 }
];

function LogViewer(props) {
    const { selectedInterface, selectedDate } = props;

    const socket = useContext(SocketContext);

    const [rows, setRows] = useState([]);

    useEffect(() => {
        if (socket && selectedInterface) {

            const handleList = (logs) => {
                setRows(logs);
            };
            socket.on(`logs:list`, handleList);

            return () => socket.off(`logs:list`, handleList);
        }
    }, [socket, selectedInterface]);
    useEffect(() => {
        if (socket && selectedInterface) {
            socket.emit(`join`, selectedInterface);

            const date = selectedDate.format('YYYYMMDD');

            socket.emit(`logs:list`, { interfaceName: selectedInterface, date });

            return () => socket.emit(`leave`, selectedInterface);
        }
    }, [socket, selectedInterface, selectedDate]);

    return (
        <DataGrid
            // sx={{ flex: 1 }}
            rows={rows}
            columns={columns}
            disableRowSelectionOnClick
            initialState={{
                columns: {
                    columnVisibilityModel: {
                        job: false
                    },
                },
                pagination: {
                    paginationModel: {
                        pageSize: 25
                    }
                },
                sorting: {
                    sortModel: [{ field: 'Timestamp', sort: 'desc' }],
                }
            }}
            pageSizeOptions={[25, 50, 100]}
        />
    )
}

export default LogViewer;