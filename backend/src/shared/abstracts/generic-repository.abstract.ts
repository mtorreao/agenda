export abstract class IGenericRepository<T> {
  abstract findById(id: string): Promise<T>;
  abstract findAll(): Promise<T[]>;
  abstract create(data: T): Promise<T>;
  abstract update(id: string, data: Partial<T>): Promise<T>;
  abstract delete(id: string): Promise<void>;
}
