export interface AuditData {
  createdAt?: Date;
  lastModifiedAt?: Date;
}

export abstract class BaseEntity {
  private lastModifiedAt: Date;
  private readonly createdAt: Date;
  abstract get PK(): string;
  abstract get SK(): string;

  protected constructor(data: AuditData) {
    const creationDate = data.createdAt ? new Date(data.createdAt) : new Date();
    this.createdAt = creationDate;
    this.lastModifiedAt = creationDate;
  }

  public get CreatedAt(): Date {
    return this.createdAt;
  }

  public get LastModifiedAt(): Date {
    return this.lastModifiedAt;
  }

  public set LastModifiedAt(newDate: Date) {
    this.lastModifiedAt = newDate;
  }

  auditObj() {
    return {
      createdAt: this.createdAt,
      lastModifiedAt: this.lastModifiedAt,
    };
  }
}
