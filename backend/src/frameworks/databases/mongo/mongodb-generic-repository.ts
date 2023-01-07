import { Model } from 'mongoose';
import { IGenericRepository } from '../../../shared/abstracts/generic-repository.abstract';

export class MongoGenericRepository<T> implements IGenericRepository<T> {
  constructor(
    private readonly repository: Model<T>,
    private readonly populateOnFind: string[] = [],
  ) {}

  findById(id: string): Promise<T> {
    // return this.repository.findById(id).populate(this.populateOnFind).exec();
    return this.repository.findById(id).exec();
  }
  findAll(): Promise<T[]> {
    return this.repository.find().populate(this.populateOnFind).exec();
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
