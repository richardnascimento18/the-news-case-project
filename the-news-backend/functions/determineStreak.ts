import NewsletterRead from '../interfaces/NewsletterRead';
import UserStreak from '../interfaces/UserStreak';

export default function determineStreak(
  newslettersRead: NewsletterRead[],
  user: UserStreak,
): UserStreak {
  const currentDate = new Date().toISOString().split('T')[0].replace(/-/g, '/');
  let currentStreak = user.currentStreak;
  let longestStreak = user.longestStreak;

  let add = 0;

  newslettersRead.forEach((newsletter) => {
    if (newsletter.date === currentDate && user.viewedToday === 0) {
      add = 1;
      user.viewedToday = 1;
    } else if (newsletter.date === currentDate && user.viewedToday === 1) {
      add = 2;
    } else if (newsletter.date !== currentDate && user.viewedToday === 0) {
      add = 0;
    }
  });

  if (add === 0) {
    currentStreak = 0;
  } else if (add === 1) {
    currentStreak++;
  } else if (add === 2) {
    currentStreak = currentStreak;
  }

  if (currentStreak > longestStreak) {
    longestStreak = currentStreak;
  }

  return {
    email: user.email,
    currentStreak: currentStreak,
    longestStreak: longestStreak,
    viewedToday: user.viewedToday,
  };
}
