export class HttpError extends Error {
    status: number;
    message: string;
    info: any;

    constructor(status: number = 500, message: string = 'Internal Server Error', info?: any) {
        super(message);
        this.status = status;
        this.message = message;
        this.info = info;
    }
}

export class BadRequest extends HttpError {
    constructor(message: string = 'Bad Request', info?: any) {
        super(400, message, info);
    }
}

export class NotFound extends HttpError {
    constructor(message: string = 'Not Found', info?: any) {
        super(404, message, info);
    }
}