export class APIError extends Error {
    constructor(
        public statusCode: number,
        message: string,
    ) {
        super(message);
        this.statusCode = statusCode;
    }
}

export class NotFoundError extends APIError {
    constructor(message: string) {
        super(404, message);
    }
}

export class BadRequest extends APIError {
    constructor(message: string) {
        super(400, message);
    }
}
