import { Model } from 'mongoose';
import { IGenericRepository } from '../../../shared/abstracts/generic-repository.abstract';

export class MongoGenericRepository<T> implements IGenericRepository<T> {
  constructor(private readonly repository: Model<T>) {}

  findBy(key: string, value: any): Promise<T> {
    return this.repository
      .findOne(<T>{
        [key]: value,
      })
      .exec();
  }

  findById(id: string): Promise<T> {
    return this.repository.findById(id).exec();
  }
  findAll(userId: string): Promise<T[]> {
    return this.repository
      .find({
        userId,
      })
      .exec();
  }
  create(data: T): Promise<T> {
    return this.repository.create(data);
  }
  update(id: string, data: Partial<T>): Promise<T> {
    return this.repository.findByIdAndUpdate(id, data).exec();
  }
  delete(id: string): Promise<void> {
    this.repository.findByIdAndDelete(id).exec();
    return;
  }
}
