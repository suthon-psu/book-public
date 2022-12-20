import { AnnouncementRepository } from "./AnnouncementRepository"
import { UserResultRepository } from "./UserResultRepository"

const repositories = {
  announcements: new AnnouncementRepository(),
  userResults: new UserResultRepository()
}

export default repositories