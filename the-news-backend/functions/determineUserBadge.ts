export default function determineUserBadge(newslettersRead: number): string {
  if (newslettersRead >= 800) {
    return 'ultimate_reader';
  } else if (newslettersRead >= 500) {
    return 'avid_reader';
  } else if (newslettersRead >= 250) {
    return 'intermediate_reader';
  } else if (newslettersRead < 250) {
    return 'rookie_reader';
  }
}
