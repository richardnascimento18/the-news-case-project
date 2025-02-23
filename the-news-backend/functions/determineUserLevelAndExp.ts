import UserLevelAndExp from '../interfaces/UserLevelAndExp';

function determineUserLevelAndExp(user: UserLevelAndExp): UserLevelAndExp {
  const totalExp: number = user.amountOfNewslettersRead * 10;
  let newLevel: number = totalExp / 100;
  let remainderExp: number = 0;

  if (newLevel < 1) {
    newLevel = 0;
    remainderExp = totalExp;
  } else if (newLevel > 1) {
    newLevel = Math.floor(newLevel);
    remainderExp = Number((newLevel % 1).toFixed(4)) * 10;
  }

  return {
    email: user.email,
    amountOfNewslettersRead: user.amountOfNewslettersRead,
    level: newLevel,
    exp: remainderExp,
  };
}

export default determineUserLevelAndExp;
