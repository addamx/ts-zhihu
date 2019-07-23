import { BaseService } from "../Base/BaseService";
import QuestionModel, { Question } from "./QuestionEntity";

export class QuestionService extends BaseService<Question> {
  constructor() {
    super();
    this.model = QuestionModel;
  }
}
