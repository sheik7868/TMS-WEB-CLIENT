export interface TaskFormInterface {
    configs: {
        datatestID: string
    }
    data: {
        taskData: Object
        isEditForm: boolean
        baseData: Object
    }
    callbacks: {
        handleCreate: Function
        handleEdit: Function
        handleClose: Function
    }
}