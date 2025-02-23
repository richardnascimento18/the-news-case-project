import User from '../interfaces/User';

export function determineUserRank(users: User[], newUser?: User): User[] {
  if (newUser) users.push(newUser);

  users.sort((a, b) => b.newslettersRead - a.newslettersRead);

  users.forEach((user, index) => {
    user.currentRank = String(index + 1).padStart(3, '0');
  });

  return users;
}
