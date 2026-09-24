import axios from 'axios';
import { AxiosBasicCredentials, AxiosRequestConfig } from 'axios';
import  Configuration  from '../../config';

const configuration = new Configuration();

const createAxiosInstance = (auth: AxiosBasicCredentials, addBearerTokenInHeader: boolean = false, context: any, accessToken: any = null) => {
    const axiosInstance = axios.create({
        baseURL: "",
    })

    axiosInstance.interceptors.request.use(
        (config) => {
            // Add Authorization header with token if token exists
            config.headers.MerchantKey = configuration?.HEADERS?.MERCHANT_KEY
            config.headers.TenantKey = configuration?.HEADERS?.TENANT_KEY
            config.auth = auth
            return config
        },
        (error) => {
            // Do something with the request error
            console.error('Request error:', error)
            return Promise.reject(error)
        }
    )

    axiosInstance.interceptors.response.use(
        (response): any => {
            // Handle successful responses
            const { status, statusText, data } = response
            // Return response in desired format for status code 200
            return {
                status: status,
                message: data?.serviceResponse?.message || statusText,
                output: data?.outputResponse || data,
            }
        },
        (error) => {
            // Handle error responses
            if (error?.response?.status === 400) {
                // Return response in desired format for status code 400
                return {
                    status: error?.response?.status,
                    message: error?.response?.data?.serviceResponse?.message,
                    output: error?.response?.data,
                }
            } else if (error?.response?.status === 401) {
                // Return response in desired format for status code 401
                return {
                    status: error?.response?.status,
                    message: error?.response?.data?.serviceResponse?.message,
                    output: 'Unauthorized',
                }
            } else if (error?.response?.status === 404) {
                // Return response in desired format for status code 404
                return {
                    status: error?.response?.status,
                    message: error?.response?.data?.serviceResponse?.message,
                    output: null,
                }
            } else {
                // Return response in desired format for all other error status codes
                return {
                    status: error?.response?.status,
                    message: error?.response?.data?.serviceResponse?.message,
                    output: null,
                }
            }
        }
    )
    return axiosInstance
}

export class AxiosServer {


    async post(url: any, reqData: any, header: Record<string, string>, auth: AxiosBasicCredentials, addBearerTokenInHeader: boolean = false, context?: any) {
        try {
            const axiosInstance = createAxiosInstance(auth, addBearerTokenInHeader, context)
            let config: AxiosRequestConfig = {
                headers: header
            };
            let response = await axiosInstance.post(url, reqData, config)
            return response
        } catch (error: any) {
            console.error("ERROR IN POST API CALL: ", error)
        }
    }


}

