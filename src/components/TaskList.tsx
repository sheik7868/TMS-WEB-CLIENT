import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { TaskListInterface } from "../interfaces/components/TaskList.Interface";
import { Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Helper } from "@/utils/Helper";
import IconButton from '@mui/material/IconButton';

const helper = new Helper();

const TaskListHeaders = [
    {
        "ColumnName": 'Title',
        "DisplayName": 'Title',
        "IsVisible": true
    },
    {
        "ColumnName": "TaskCode",
        "DisplayName": "Code",
        "IsVisible": true
    },
    {
        "ColumnName": "StatusID",
        "DisplayName": "Status",
        "IsVisible": true
    },
    {
        "ColumnName": "AssignedUserID",
        "DisplayName": "Assignee",
        "IsVisible": true
    },
    {
        "ColumnName": "StartDate",
        "DisplayName": "Start Date",
        "IsVisible": true
    },
    {
        "ColumnName": "EndDate",
        "DisplayName": "End Date",
        "IsVisible": true
    },
    {
        "ColumnName": "CreatedBy",
        "DisplayName": "Created By",
        "IsVisible": true
    },
    {
        "ColumnName": "CreatedDate",
        "DisplayName": "Created Date",
        "IsVisible": true
    },
]
export function TaskList({ configs, data, callbacks }: TaskListInterface) {
    const [statusData, setStatusData] = useState<any>();
    const [assigneeData, setAssigneeData] = useState<any>();

    useEffect(() => {
        setStatusData(data?.baseSetup?.statusData);
        setAssigneeData(data?.baseSetup?.assigneeData);
    }, [configs, data, callbacks])

    return (
        <>
            <span style={{ marginLeft: '15px', marginTop: '8px' }}><b>File-TaskLikst.tsx</b></span>
            <div style={{ marginLeft: "15px", marginRight: "15px", marginBottom: '10px' }}>
                {
                    data?.TaskListData?.length > 0
                        ?
                        <TableContainer component={Paper} sx={{ maxHeight: { xs: "70vh", sm: "70vh", md: "70vh", lg: "80vh", xl: "80vh" }, minHeight: 'fit-content', borderRadius: '15px', mt: 1 }}>
                            <Table data-testid={configs?.dataTestID} sx={{ minWidth: 650 }} aria-label="sticky table" stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        {
                                            TaskListHeaders?.map((column: any, index: number) => (
                                                column?.IsVisible && <TableCell key={index} sx={{ background: '#1976d2', color: 'white' }}><b> {(column?.DisplayName)}</b></TableCell>
                                            ))
                                        }
                                        <TableCell sx={{ maxHeight: "75vh", minHeight: 'fit-content', background: '#1976d2', color: 'white' }}>
                                            <b>Edit</b>
                                        </TableCell>
                                        <TableCell sx={{ maxHeight: "75vh", minHeight: 'fit-content', background: '#1976d2', color: 'white' }}>
                                            <b>Delete</b>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data?.TaskListData?.map((data: any, index: any) =>
                                        <TableRow key={index}
                                            sx={{
                                                '&:last-child td, &:last-child th': { border: 0 },
                                                '&:hover': {
                                                    transform: 'scale(1.0)', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)'
                                                }
                                            }}>
                                            {TaskListHeaders?.find((data: any) => data?.ColumnName === 'Title') &&
                                                <TableCell>
                                                    {data?.Title}
                                                </TableCell>
                                            }
                                            {TaskListHeaders?.find((data: any) => data?.ColumnName === 'TaskCode') &&
                                                <TableCell >
                                                    {data?.TaskCode}
                                                </TableCell>
                                            }
                                            {TaskListHeaders?.find((data: any) => data?.ColumnName === 'StatusID') &&
                                                <TableCell>
                                                    {statusData && data.StatusID ? (
                                                        <Chip
                                                            label={statusData.find((status: any) => status.StatusID === data.StatusID)?.StatusName}
                                                            sx={{ color: 'white', background: 'green' }}
                                                        />
                                                    ) : (
                                                        <Chip
                                                            label="Unknown"
                                                            color="default"
                                                        />
                                                    )}
                                                </TableCell>
                                            }
                                            {TaskListHeaders?.find((data: any) => data?.ColumnName === 'AssignedUserID') &&
                                                <TableCell>
                                                    {assigneeData && data.AssignedUserID ? assigneeData.find((user: any) => user.UserID === data.AssignedUserID)?.UserName : '-'}
                                                </TableCell>
                                            }
                                            {TaskListHeaders?.find((data: any) => data?.ColumnName === 'StartDate') &&
                                                <TableCell >
                                                    {helper.converttoDateFormat(data?.StartDate, "MM/DD/YYYY")}
                                                </TableCell>
                                            }
                                            {TaskListHeaders?.find((data: any) => data?.ColumnName === 'EndDate') &&
                                                <TableCell >
                                                    {helper.converttoDateFormat(data?.EndDate, "MM/DD/YYYY")}
                                                </TableCell>
                                            }
                                            {TaskListHeaders?.find((data: any) => data?.ColumnName === 'CreatedBy') &&
                                                <TableCell >
                                                    {data?.CreatedBy}
                                                </TableCell>
                                            }
                                            {TaskListHeaders?.find((data: any) => data?.ColumnName === 'CreatedDate') &&
                                                <TableCell >
                                                    {helper.converttoDateFormat(data?.CreatedDate, "MM/DD/YYYY")}
                                                </TableCell>
                                            }
                                            <TableCell data-testid={data?.TaskCode + 'edit'}>
                                                <IconButton onClick={() => callbacks.handleTaskEdit(data)}>
                                                    <span className="material-icons" style={{ fontSize: '16px', cursor: 'pointer', color: '#1976d2', fontWeight: 800 }}>
                                                        edit
                                                    </span>
                                                </IconButton>
                                            </TableCell>
                                            <TableCell data-testid={data?.TaskCode + 'delete'} sx={{ display: 'flex', justifyContent: 'center', cursor: 'pointer' }}>
                                                <IconButton onClick={() => callbacks.handleTaskDelete(data)}>
                                                    <span className="material-icons" style={{ fontSize: '16px', color: 'red', fontWeight: 800 }}>
                                                        delete
                                                    </span>
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        :
                        <span style={{ display: 'flex', justifyContent: 'center', paddingTop: '10%' }}>
                            <b>No Task Data has been Found...!</b>
                        </span>
                }
            </div>
        </>
    )
}
