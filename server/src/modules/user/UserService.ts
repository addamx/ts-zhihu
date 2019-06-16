import { ModelType } from 'typegoose'
import UserModel, { User } from './UserEntity'

export class UserService {
  private readonly model: ModelType<User>

  constructor() {
    this.model = UserModel
  }

  async find(selector?: Partial<User>) {
    return this.model.find(selector);
  }

  async findOneById(_id: string) {
    return this.model.findOne({ _id });
  }

  async findOneByEmail(email: string) {
    return this.model.findOne({ email });
  }

  async create(data: Partial<User>) {
    const user = await this.model.create(data);

    // await sendEmail(email, await createConfirmationUrl(user.id));

    return user;
  }

  async remove(_id: string) {
    let entityToRemove = await this.model.findOne(_id)
    await this.model.remove(entityToRemove);
  }

  async count(entity: any) {
    return this.model.count(entity);
  }
}
