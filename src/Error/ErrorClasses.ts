export abstract class BaseError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, BaseError.prototype);
  }

  abstract serializeErrors(): { message: string; field?: string };
}

export class InvalidPayload extends BaseError {
  statusCode = 400;

  constructor(public message: string) {
    super("Invalid_Payload");

    Object.setPrototypeOf(this, InvalidPayload.prototype);
  }

  serializeErrors(): { message: string } {
    return { message: this.message };
  }
}
