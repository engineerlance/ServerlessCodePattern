export abstract class BaseError extends Error {
    abstract readonly statusCode: number

    constructor(public error_code: string, public error_message: string) {
        super()

        Object.setPrototypeOf(this, new.target.prototype)
    }

    abstract serializeErrors(): { error_code: string; error_message: string }
}

export class InvalidPayload extends BaseError {
    statusCode = 400

    constructor() {
        super("Invalid_Payload", "The JSON body provided is incorrect")
    }

    serializeErrors(): { error_code: string; error_message: string } {
        return { error_code: this.error_code, error_message: this.error_message }
    }
}
