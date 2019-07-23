import { BaseService } from "../Base/BaseService";
import NoticeModel, { Notice } from "./NoticeEntity";

export class NoticeService extends BaseService<Notice> {
  constructor() {
    super();
    this.model = NoticeModel;
  }
}
