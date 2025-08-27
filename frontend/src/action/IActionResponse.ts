export interface IActionResponse<T = void> {
    success: boolean;
    message: string;
    data?: T;
}
