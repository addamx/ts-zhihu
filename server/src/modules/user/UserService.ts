import { BaseService } from "../Base/BaseService";
import UserModel, { User } from "./UserEntity";

export class UserService extends BaseService<User> {
  constructor() {
    super();
    this.model = UserModel;
  }

  async findOneByEmail(email: string) {
    return this.model.findOne({ email });
  }
}
