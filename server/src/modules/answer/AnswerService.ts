import { BaseService } from "../Base/BaseService";
import AnswerModel, { Answer } from "./AnswerEntity";

export class AnswerService extends BaseService<Answer> {
  constructor() {
    super();
    this.model = AnswerModel;
  }
}
