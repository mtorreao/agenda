export abstract class IGenericRepository<T> {
  abstract findById(id: string): Promise<T>;
  abstract findBy(key: string, value: any): Promise<T>;
  abstract findAll(userId: string): Promise<T[]>;
  abstract create(data: Omit<T, 'id'>): Promise<T>;
  abstract update(id: string, data: Partial<T>): Promise<T>;
  abstract delete(id: string): Promise<void>;
}
