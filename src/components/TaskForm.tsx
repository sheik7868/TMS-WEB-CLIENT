import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import { TaskFormInterface } from '@/interfaces/components/TaskFormInterface';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import dayjs, { Dayjs } from 'dayjs';
import moment from 'moment';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={5} ref={ref} variant="filled" {...props} />;
});

export default function TaskForm({ configs, data, callbacks }: TaskFormInterface) {

    const initialFormState = {
        Title: data?.taskData.Title || null,
        TaskCode: data?.taskData.TaskCode || null,
        Description: data?.taskData.Description || null,
        ActivityID: data?.taskData.ActivityID || null,
        StartDate: data?.taskData.StartDate || null,
        EndDate: data?.taskData.EndDate || null,
        Risk: data?.taskData.Risk || null,
        Impediment: data?.taskData.Impediment || null,
        StatusID: data?.taskData.StatusID || null,
        PriorityID: data?.taskData.PriorityID || null,
        SeverityID: data?.taskData.SeverityID || null,
        TaskDependency: data?.taskData.TaskDependency || null,
        AssignedUserID: data?.taskData.AssignedUserID || null
    };


    const [formData, setFormData] = useState(initialFormState);
    const [isDateFieldMissing, setIsDateFieldMissing] = useState<boolean>(false);

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;

        // Handle date fields separately
        if (name === 'StartDate' || name === 'EndDate') {
            // Convert the date value to ISO string
            const dateValue = value ? new Date(value).toISOString() : null;

            setFormData((prevData) => ({
                ...prevData,
                [name]: dateValue,
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value && value,
            }));
        }
    };

    const handleEdit = async () => {
        let editTaskData = {
            ...data?.taskData,
            ...formData
        }
        callbacks.handleEdit(editTaskData);
    }

    return (
        <Grid sx={{ width: { xs: "300px", sm: "300px", md: "450px", lg: "550px", xl: "550px" } }}>
            <Snackbar
                open={isDateFieldMissing}
                onClose={() => setIsDateFieldMissing(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                autoHideDuration={3000}
            >
                <Alert severity='error' onClose={() => { setIsDateFieldMissing(false) }} sx={{ width: '100%' }}>
                    Please Fill the Start Date and End Date
                </Alert>
            </Snackbar>
            <b>File-TaskFrom.tsx</b>
            <form style={{ padding: 5, marginTop: 7, height: '100vh', overflowY: 'scroll' }} onSubmit={(e) => {
                e?.preventDefault();
                if (!formData.StartDate || !formData.EndDate) {
                    setIsDateFieldMissing(true);
                }
                else if (data?.isEditForm) {
                    handleEdit();
                    callbacks.handleClose()
                }
                else {
                    callbacks.handleCreate(formData);
                    callbacks.handleClose()
                }
            }}>
                <Grid container spacing={0} sx={{ mt: 2 }}>
                    <Grid xs={12} sm={12} md={12} lg={6} xl={6}>
                        <TextField
                            sx={{ pl: 2, pr: 2, borderRadius: "0px" }}
                            fullWidth
                            variant="standard"
                            placeholder='Enter Task Title...'
                            name='Title'
                            size='small'
                            value={formData?.Title}
                            required
                            onChange={(e: any) => handleInputChange(e)}
                        />
                    </Grid>
                    <Grid xs={12} sm={12} md={12} lg={6} xl={6}>
                        <TextField
                            sx={{ pl: 2, pr: 2, pt: { xs: 2, sm: 2, md: 2 ,lg:0,xl:0}, borderRadius: "0px" }}
                            fullWidth
                            variant="standard"
                            name='TaskCode'
                            placeholder='Enter Task Code...'
                            size='small'
                            value={formData?.TaskCode}
                            required
                            onChange={(e: any) => handleInputChange(e)}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={0} sx={{ mt: 2 }}>
                    <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
                        <TextField
                            sx={{ pl: 2, pr: 2, borderRadius: "0px" }}
                            fullWidth
                            variant="standard"
                            name='Description'
                            value={formData?.Description}
                            placeholder='Enter Description...'
                            size='small'
                            onChange={(e: any) => handleInputChange(e)}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={0} sx={{ mt: 2 }}>
                    <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pt: 0, pl: 2, pr: 1 }}>
                        <InputLabel id="demo-simple-select-standard-label">Activity</InputLabel>
                        <Select
                            onChange={(e) => handleInputChange({ target: { name: 'ActivityID', value: e.target.value } })}
                            name='ActivityID'
                            fullWidth
                            value={formData?.ActivityID}
                            size='small'
                        >{
                                data?.baseData?.activityData?.map((data: any) => (
                                    <MenuItem
                                        value={data?.ActivityID}
                                    >
                                        {data?.ActivityName}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </Grid>
                </Grid>
                <Grid container spacing={0} sx={{ mt: 3 }}>
                    <Grid xs={12} sm={12} md={12} lg={6} xl={6} sx={{ pl: 2, pr: 1 }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Start Date"
                                value={formData.StartDate ? dayjs(moment(formData?.StartDate).format("YYYY-MM-DD")) : null}
                                onChange={(date) => handleInputChange({ target: { name: 'StartDate', value: date } })}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid xs={12} sm={12} md={12} lg={6} xl={6} sx={{ pl: 2, pr: 1, pt: { xs: 2, sm: 2, md: 2 ,lg:0,xl:0} }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="End Date"
                                value={formData.EndDate ? dayjs(moment(formData?.EndDate).format("YYYY-MM-DD")) : null}
                                onChange={(date) => handleInputChange({ target: { name: 'EndDate', value: date } })}
                            />
                        </LocalizationProvider>
                    </Grid>
                </Grid>
                <Grid container spacing={0} sx={{ mt: 2 }}>
                    <Grid xs={12} sm={12} md={12} lg={6} xl={6}>
                        <TextField
                            sx={{ pl: 2, pr: 2, borderRadius: "0px" }}
                            fullWidth
                            variant="standard"
                            name='Risk'
                            placeholder='Enter Risk...'
                            size='small'
                            value={formData?.Risk}
                            onChange={(e: any) => handleInputChange(e)}
                        />
                    </Grid>
                    <Grid xs={12} sm={12} md={12} lg={6} xl={6}>
                        <TextField
                            sx={{ pl: 2, pr: 2, pt: { xs: 2, sm: 2, md: 2 ,lg:0,xl:0}, borderRadius: "0px" }}
                            fullWidth
                            variant="standard"
                            placeholder='Enter Impediment...'
                            name='Impediment'
                            size='small'
                            value={formData?.Impediment}
                            onChange={(e: any) => handleInputChange(e)}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={0} sx={{ mt: 2 }}>
                    <Grid xs={12} sm={12} md={12} lg={4} xl={4} sx={{ pt: 2, pl: 2, pr: 1 }}>
                        <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
                        <Select
                            onChange={(e) => handleInputChange({ target: { name: 'StatusID', value: e.target.value } })}
                            name='StatusID'
                            required={true}
                            fullWidth
                            value={formData?.StatusID}
                            size='small'
                        >{
                                data?.baseData?.statusData?.map((data: any) => (
                                    <MenuItem
                                        value={data?.StatusID}
                                    >
                                        {data?.StatusName}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </Grid>
                    <Grid xs={12} sm={12} md={12} lg={4} xl={4} sx={{ pt: 2, pl: 2, pr: 1 }}>
                        <InputLabel id="demo-simple-select-standard-label">Priority</InputLabel>
                        <Select
                            onChange={(e) => handleInputChange({ target: { name: 'PriorityID', value: e.target.value } })}
                            name='PriorityID'
                            required={true}
                            fullWidth
                            value={formData?.PriorityID}
                            size='small'
                        >{
                                data?.baseData?.priorityData?.map((data: any) => (
                                    <MenuItem
                                        value={data?.PriorityID}
                                    >
                                        {data?.PriorityName}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </Grid>
                    <Grid xs={12} sm={12} md={12} lg={4} xl={4} sx={{ pr: 1, pl: 2, pt: 2 }}>
                        <InputLabel id="demo-simple-select-standard-label">Severity</InputLabel>
                        <Select
                            onChange={(e) => handleInputChange({ target: { name: 'SeverityID', value: e.target.value } })}
                            name='SeverityID'
                            required={true}
                            fullWidth
                            value={formData?.SeverityID}
                            size='small'
                        >
                            {
                                data?.baseData?.severityData?.map((data: any) => (
                                    <MenuItem
                                        value={data?.SeverityID}
                                    >
                                        {data?.SeverityName}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </Grid>
                </Grid>
                <Grid container spacing={0} sx={{ mt: 2 }}>
                    <Grid xs={12} sm={12} md={12} lg={6} xl={6} sx={{ pt: 4 }}>
                        <TextField
                            sx={{ pl: 2, pr: 2, borderRadius: "0px" }}
                            fullWidth
                            variant="standard"
                            placeholder='Enter Task Dependency...'
                            name='TaskDependency'
                            size='small'
                            value={formData?.TaskDependency}
                            onChange={(e: any) => handleInputChange(e)}
                        />
                    </Grid>
                    <Grid xs={12} sm={12} md={12} lg={6} xl={6} sx={{ pr: 1, pt: { xs: 2, sm: 2, md: 2 ,lg:0,xl:0}, pl: 2 }}>
                        <InputLabel id="demo-simple-select-standard-label">Assignee</InputLabel>
                        <Select
                            onChange={(e) => handleInputChange({ target: { name: 'AssignedUserID', value: e.target.value } })}
                            name='AssignedUserID'
                            required={true}
                            fullWidth
                            value={formData?.AssignedUserID}
                            size='small'
                        >
                            {
                                data?.baseData?.assigneeData?.map((data: any) => (
                                    <MenuItem
                                        value={data?.UserID}
                                    >
                                        {data?.UserName}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </Grid>
                </Grid>
                <Grid container spacing={1} sx={{ mt: 2, pb: 2 }}>
                    <Grid xs={6} sm={6} md={6} lg={6} xl={6} sx={{ width: "100%", textAlign: "right", pt: 2 }}>
                        <Button
                            variant="contained"
                            type='submit'
                            sx={{
                                borderRadius: "20px",
                                textTransform: 'none',
                                background: 'green',
                                fontSize: '15px',
                                fontWeight: 500,
                                color: 'white',
                                cursor: "pointer",
                                ':hover': {
                                    background: 'green',
                                    color: 'white'
                                }
                            }}
                        >
                            {data?.isEditForm ? 'Update Task' : 'Create Task'}
                        </Button>
                    </Grid>
                    <Grid xs={6} sm={6} md={6} lg={6} xl={6} sx={{ width: "100%", textAlign: "left", pl: 2, pt: 2 }}>
                        <Button
                            variant="contained"
                            sx={{
                                borderRadius: "20px",
                                textTransform: 'none',
                                fontSize: '15px',
                                fontWeight: 500
                            }}
                            onClick={() => callbacks.handleClose()}
                        >
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Grid>
    );
}