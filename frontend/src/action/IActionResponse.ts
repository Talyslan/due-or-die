export interface IActionResponse<T = void> {
    success: boolean;
    message: string | null;
    data: T | null;
}
