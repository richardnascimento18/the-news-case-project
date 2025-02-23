import User from '../interfaces/User';
import updateUserRankInDatabase from './updateUserRankInDatabase';

export default async function updateUsersRank(users: User[]): Promise<void> {
  for (const user of users) {
    await updateUserRankInDatabase(user.email, user.currentRank);
  }
}
