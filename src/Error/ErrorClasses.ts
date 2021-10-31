export abstract class BaseError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
  }

  abstract serializeErrors(): { message: string };
}

export class InvalidPayload extends BaseError {
  statusCode = 400;

  constructor(public message: string) {
    super("Invalid_Payload");
  }

  serializeErrors(): { message: string } {
    return { message: this.message };
  }
}
