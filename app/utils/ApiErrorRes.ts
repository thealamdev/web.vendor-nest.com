import axios from "axios";

export const ApiErrorRes = <T>(error: unknown): ApiResponse<T> => {
    if (axios.isAxiosError(error) && error.response) {
        return error.response.data;
    }
    return {
        status: 500,
        success: false,
        message: "Something went wrong",
    } as ApiResponse<any>
}