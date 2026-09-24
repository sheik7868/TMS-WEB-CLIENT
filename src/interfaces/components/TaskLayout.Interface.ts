export interface TaskLayoutInterface {
    configs: {
        datatestID: string
    }
    data: {
        totalCount: number
    }
    callbacks: {
        handleSearch: Function
        handleCreate: Function
    }
}