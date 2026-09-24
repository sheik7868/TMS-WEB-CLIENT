import { AxiosServer } from "@/utils/AxiosServer";
import { AxiosClient } from "@/utils/AxiosClient";
import { Endpoints } from "@/utils/Endpoints";
import  Configuration  from '../../config';

const configuration = new Configuration();

const axiosServer = new AxiosServer()
const endpoints = new Endpoints()
const axiosClient = new AxiosClient()

export class TaskApi{
    async readStatusSSR(statusReq : any){
        return await axiosServer?.post(
            configuration?.GATEWAY_URL + endpoints?.READ_STATUS,
            statusReq,
            {},
            {
                username: configuration?.GATEWAY_USERNAME,
                password: configuration?.GATEWAY_PASSWORD
            }
        )
    }

    async readPrioritySSR(priorityReq : any){
        return await axiosServer?.post(
            configuration?.GATEWAY_URL + endpoints?.READ_PRIORITY,
            priorityReq,
            {},
            {
                username: configuration?.GATEWAY_USERNAME,
                password: configuration?.GATEWAY_PASSWORD
            }
        )
    }

    async readSeveritySSR(severityReq : any){
        return await axiosServer?.post(
            configuration?.GATEWAY_URL + endpoints?.READ_SEVERITY,
            severityReq,
            {},
            {
                username: configuration?.GATEWAY_USERNAME,
                password: configuration?.GATEWAY_PASSWORD
            }
        )
    }

    async readActivitySSR(activityReq : any){
        return await axiosServer?.post(
            configuration?.GATEWAY_URL + endpoints?.READ_ACTIVITY,
            activityReq,
            {},
            {
                username: configuration?.GATEWAY_USERNAME,
                password: configuration?.GATEWAY_PASSWORD
            }
        )
    }

    async readAssigneeSSR(assigneeReq : any){
        return await axiosServer?.post(
            configuration?.GATEWAY_URL + endpoints?.READ_USER,
            assigneeReq,
            {},
            {
                username: configuration?.GATEWAY_USERNAME,
                password: configuration?.GATEWAY_PASSWORD
            }
        )
    }


    async readTaskSSR(taskReq : any){
        return await axiosServer?.post(
            configuration?.GATEWAY_URL + endpoints?.READ_TASKS,
            taskReq,
            {},
            {
                username: configuration?.GATEWAY_USERNAME,
                password: configuration?.GATEWAY_PASSWORD
            }
        )
    }
    

    async readTasks(taskReq : any){
        return await axiosClient?.post(
            configuration?.GATEWAY_URL + endpoints?.READ_TASKS,
            taskReq,
            {},
            {
                username: configuration?.GATEWAY_USERNAME,
                password: configuration?.GATEWAY_PASSWORD
            }
        )
    }

    async deleteTasks(taskReq : any){
        return await axiosClient?.patch(
            configuration?.GATEWAY_URL + endpoints?.UPDATE_TASK,
            taskReq,
            {},
            {
                username: configuration?.GATEWAY_USERNAME,
                password: configuration?.GATEWAY_PASSWORD
            }
        )
    }

    async updateTask(taskReq : any){
        return await axiosClient?.patch(
            configuration?.GATEWAY_URL + endpoints?.UPDATE_TASK,
            taskReq,
            {},
            {
                username: configuration?.GATEWAY_USERNAME,
                password: configuration?.GATEWAY_PASSWORD
            }
        )
    }

    async createTask(taskReq : any){
        return await axiosClient?.post(
            configuration?.GATEWAY_URL + endpoints?.CREATE_TASK,
            taskReq,
            {},
            {
                username: configuration?.GATEWAY_USERNAME,
                password: configuration?.GATEWAY_PASSWORD
            }
        )
    }
}