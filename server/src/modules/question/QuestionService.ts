import { ModelType } from "typegoose";
import QuestionModel, { Question } from "./QuestionEntity";

export class QuestionService {
  private readonly model: ModelType<Question>;

  constructor() {
    this.model = QuestionModel;
  }

  async find(selector?: Partial<Question>) {
    return this.model.find(selector);
  }

  async findOneById(_id: string) {
    return this.model.findOne({ _id });
  }

  async create(data: Partial<Question>) {
    const Question = await this.model.create(data);

    return Question;
  }

  async remove(_id: string) {
    let entityToRemove = await this.model.findOne(_id);
    await this.model.remove(entityToRemove);
  }

  async count(entity: any) {
    return this.model.count(entity);
  }
}
