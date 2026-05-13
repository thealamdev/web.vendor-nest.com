type ApiError = {
    [key: string]: string[]
}

type ApiResponse<T = unknown> = {
    status: number;
    success: boolean;
    message?: string;
    errors?: ApiError;
    payload: T
}