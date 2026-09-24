export interface TaskListInterface {
    configs: {
        dataTestID: string
    }
    data: {
        TaskListData: Array<any>
        baseSetup: object
    }
    callbacks: {
        handleTaskEdit: Function
        handleTaskDelete: Function
    }
}