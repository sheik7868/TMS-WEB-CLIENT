import Head from 'next/head'
import TopBar from '../components/Layout/TopBar';
import React, { useState, useEffect } from 'react';
import TaskLayout from '@/components/TaskLayout';
import { TaskList } from '@/components/TaskList';
import { TaskApiFunction } from '../functions/TaskFunction';
import { Constants } from '@/utils/Constants';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Drawer from '@mui/material/Drawer';
import TaskForm from '@/components/TaskForm';
import Footer from '@/components/Layout/Footer';

const taskApiFunction = new TaskApiFunction();
const constants = new Constants();
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={5} ref={ref} variant="filled" {...props} />;
});

export default function Home(props: any) {

  const [taskListData, setTaskListData] = useState<any>();
  const [isTaskListLoading, setIsTaskListLoading] = useState<boolean>(true);
  const [baseSetupData, setBaseSetupData] = useState<any>();
  const [isDeletePopUpVisible, setIsDeletePopUpVisible] = useState<boolean>(false);
  const [deleteTaskRecord, setDeleteTaskRecord] = useState<any>();
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState(false);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState(false);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState<boolean>(false);
  const [isCreateMessageOpen, setIsCreateMessageOpen] = useState<boolean>(false);
  const [isEditMessageOpen, setIsEditMessageOpen] = useState<boolean>(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState<boolean>(false);
  const [isDuplicateRecord, setIsDuplicateRecord] = useState<boolean>(false);
  const [editTaskData, setEditTaskData] = useState<any>();

  const handleSearch = async (data: any) => {
    setIsTaskListLoading(true);
    let filter = {
      TaskCode: {
        contains: data
      },
      IsDeleted: false
    }
    let searchTaskList = await taskApiFunction?.readTasks(data?.length > 0 ? filter : { IsDeleted: false });
    if (searchTaskList?.status === 200) {
      setIsTaskListLoading(false);
      setTaskListData(searchTaskList?.output);
    }
    else {
      setIsTaskListLoading(false);
      setTaskListData([]);
    }
  }

  const handleDelete = async () => {
    setIsTaskListLoading(true);
    setIsDeletePopUpVisible(false);
    let req = {
      filter: {
        TaskID: deleteTaskRecord?.TaskID
      },
      fields: {
        IsDeleted: true,
        ModifiedUserID: constants?.USER_DETAIL?.USER_ID,
        ModifiedBy: constants?.USER_DETAIL?.USER_NAME,
        ModifiedDate: new Date()
      }
    }
    let deleteTask = await taskApiFunction?.deleteTasks(req);
    handleSearch('');
    if (deleteTask?.status === 200) {
      setDeleteSuccessMessage(true);
    }
    else {
      setDeleteErrorMessage(true);
    }
  }

  const handleCreate = async (data: any) => {
    setIsTaskListLoading(true);
    setIsDuplicateRecord(false);
    let createReqData = {
      data: {
        ...data,
        CreatedBy: constants?.USER_DETAIL?.USER_NAME,
        CreatedUserID: constants?.USER_DETAIL?.USER_ID
      },
      filter: {
        Title: data?.Title,
        AssignedUserID: data?.AssignedUserID
      }
    }
    let createTask = await taskApiFunction?.createTask(createReqData);
    if (createTask?.status === 200) {
      setIsCreateMessageOpen(true);
    }
    else if (createTask?.status === 409) {
      setIsDuplicateRecord(true);
    }
    else {
      setDeleteErrorMessage(true);

    }
    handleSearch('');
  }

  const handleEditTask = async (data: any) => {
    setIsTaskListLoading(true);
    let updateReq = {
      filter: {
        TaskID: data?.TaskID
      },
      fields: {
        ...data,
        ModifiedUserID: constants?.USER_DETAIL?.USER_ID,
        ModifiedBy: constants?.USER_DETAIL?.USER_NAME,
        ModifiedDate: new Date()
      }
    };
    let updateTask = await taskApiFunction?.updateTask(updateReq);
    if (updateTask?.status === 200) {
      setIsEditMessageOpen(true);
    }
    else {
      setDeleteErrorMessage(true);
    }
    handleSearch('');
  }

  useEffect(() => {
    let data = {
      statusData: props?.statusData,
      priorityData: props?.priorityData,
      severityData: props?.severityData,
      activityData: props?.activityData,
      assigneeData: props?.assigneeData
    };
    setBaseSetupData(data);
    setTaskListData(props?.taskData);
    setIsTaskListLoading(false);
  }, [props])



  return (
    <>
      <Head>
        <title>TMS</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Head>
      <Snackbar
        open={deleteSuccessMessage}
        onClose={() => setDeleteSuccessMessage(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={5000}
      >
        <Alert severity='success' onClose={() => { setDeleteSuccessMessage(false) }} sx={{ width: '100%' }}>
          Task Data has been Deleted Successfully...!
        </Alert>
      </Snackbar>
      <Snackbar
        open={deleteErrorMessage}
        onClose={() => setDeleteErrorMessage(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={7000}
      >
        <Alert severity='error' onClose={() => { setDeleteErrorMessage(false) }} sx={{ width: '100%' }}>
          Something Went Wrong try again later...!
        </Alert>
      </Snackbar>
      <Snackbar
        open={isDuplicateRecord}
        onClose={() => setIsDuplicateRecord(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={7000}
      >
        <Alert severity='error' onClose={() => { setIsDuplicateRecord(false) }} sx={{ width: '100%' }}>
          Record with the given data already Exist...!
        </Alert>
      </Snackbar>
      <TopBar />
      <Snackbar
        open={isCreateMessageOpen}
        onClose={() => setIsCreateMessageOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={5000}
      >
        <Alert severity='success' onClose={() => { setIsCreateMessageOpen(false) }} sx={{ width: '100%' }}>
          Task Data has been Created Successfully...!
        </Alert>
      </Snackbar>
      <Snackbar
        open={isEditMessageOpen}
        onClose={() => setIsEditMessageOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={5000}
      >
        <Alert severity='success' onClose={() => { setIsEditMessageOpen(false) }} sx={{ width: '100%' }}>
          Task Data has been Updated Successfully...!
        </Alert>
      </Snackbar>
      <Drawer
        anchor='right'
        open={isTaskFormOpen}
      >
        <TaskForm
          configs={{
            datatestID: ''
          }}
          data={{
            taskData: editTaskData,
            isEditForm: isEditFormOpen,
            baseData: baseSetupData
          }}
          callbacks={{
            handleCreate: (data: any) => { handleCreate(data) },
            handleEdit: (data: any) => { handleEditTask(data) },
            handleClose: () => { setIsTaskFormOpen(false) }
          }}
        />
      </Drawer>
      <TaskLayout
        configs={{
          datatestID: 'task-layout'
        }}
        data={{
          totalCount: taskListData?.length
        }}
        callbacks={{
          handleSearch: (data: any) => { handleSearch(data) },
          handleCreate: () => { setIsTaskFormOpen(true), setEditTaskData({}), setIsEditFormOpen(false) }
        }}
      />
      <div style={{ height: '70vh', overflowY: 'scroll' }}>
        {
          isTaskListLoading ?
            <span style={{ display: 'flex', justifyContent: 'center', paddingTop: '10%' }}>
              <b>Loading...</b>
            </span>
            :
            <TaskList
              configs={{
                dataTestID: 'task-list'
              }}
              data={{
                TaskListData: taskListData,
                baseSetup: baseSetupData
              }}
              callbacks={{
                handleTaskEdit: (data: any) => { setIsTaskFormOpen(true), setIsEditFormOpen(true), setEditTaskData(data) },
                handleTaskDelete: (data: any) => { setIsDeletePopUpVisible(true); setDeleteTaskRecord(data) }
              }}
            />
        }
      </div>
      <Footer />
      {
        isDeletePopUpVisible &&
        <Dialog
          open={isDeletePopUpVisible}
          keepMounted
        >
          <DialogContent>
            <DialogContentText>
              <b>Are you Sure want to Delete this Task?</b>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              size='small'
              sx={{
                borderRadius: "20px",
                textTransform: 'none',
                background: '#1976d2',
                fontSize: '15px',
                fontWeight: 500,
                color: 'white',
                cursor: "pointer",
                ':hover': {
                  background: '#1976d2',
                  color: 'white'
                }
              }}
              onClick={() => setIsDeletePopUpVisible(false)}
            >
              No
            </Button>
            <Button
              variant="contained"
              size='small'
              sx={{
                borderRadius: "20px",
                textTransform: 'none',
                background: 'red',
                fontSize: '15px',
                fontWeight: 500,
                color: 'white',
                cursor: "pointer",
                ':hover': {
                  background: 'red',
                  color: 'white'
                }
              }}
              onClick={() => handleDelete()}
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      }
    </>
  )
}

export const getServerSideProps = async (context: any) => {

  let readStatus = await taskApiFunction?.readStatusSSR({});
  let readPriority = await taskApiFunction?.readPrioritySSR({});
  let readSeverity = await taskApiFunction?.readSeveritySSR({});
  let readActivity = await taskApiFunction?.readActivitySSR({});
  let readAssignee = await taskApiFunction?.readAssigneeSSR({});
  let readTask = await taskApiFunction?.readTaskSSR({ IsDeleted: false });
  return {
    props: {
      statusData: readStatus?.status === 200 ? readStatus?.output : [],
      priorityData: readPriority?.status === 200 ? readPriority?.output : [],
      severityData: readSeverity?.status === 200 ? readSeverity?.output : [],
      activityData: readActivity?.status === 200 ? readActivity?.output : [],
      assigneeData: readAssignee?.status === 200 ? readAssignee?.output : [],
      taskData: readTask?.status === 200 ? readTask?.output : []
    }
  }
}