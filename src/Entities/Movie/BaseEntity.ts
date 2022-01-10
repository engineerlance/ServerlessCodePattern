export interface AuditData {
    createdAt?: Date
    lastModifiedAt?: Date
}

export abstract class BaseEntity {
    private lastModifiedAt: string
    private readonly createdAt: string

    protected constructor(data: AuditData) {
        const creationDate = data.createdAt ? new Date(data.createdAt).toISOString() : new Date().toISOString()
        this.createdAt = creationDate
        this.lastModifiedAt = creationDate
    }

    public get CreatedAt() {
        return this.createdAt
    }

    public get LastModifiedAt() {
        return this.lastModifiedAt
    }

    auditObj() {
        return {
            createdAt: this.createdAt,
            lastModifiedAt: this.lastModifiedAt
        }
    }
}
