export interface AuditData {
    createdAt?: Date
    lastModifiedAt?: Date
}

export abstract class BaseEntity {
    public lastModifiedAt: string
    public readonly createdAt?: string

    constructor(data: AuditData) {
        if (data.createdAt) this.createdAt = data.createdAt.toISOString()
        this.lastModifiedAt = new Date().toISOString()
    }

    auditObj() {
        return {
            ...(this.createdAt && { createdAt: this.createdAt }),
            lastModifiedAt: this.lastModifiedAt
        }
    }
}
