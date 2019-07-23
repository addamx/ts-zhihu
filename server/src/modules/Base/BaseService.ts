import { ModelType } from "typegoose";

export class BaseService<T> {
  protected model: ModelType<T>;

  async find(selector?: Partial<T>) {
    return this.model.find(selector);
  }

  async findOneById(_id: string) {
    return this.model.findOne({ _id });
  }

  async create(data: Partial<T>) {
    return this.model.create(data);
  }

  async removeById(_id: string) {
    let entityToRemove = await this.model.findOne(_id);
    await this.model.remove(entityToRemove);
  }

  async count(entity: any) {
    return this.model.count(entity);
  }
}
