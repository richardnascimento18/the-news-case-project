interface UserStreaksProps {
  currentStreak: number;
  longestStreak: number;
}

function UserStreaks(userStreaks: UserStreaksProps) {
  return (
    <>
      <h1 className="font-poppins font-normal italic text-white text-(length:--font-size-small)/(--font-size-medium) mr-(--margin-component-small)">
        Sequência Atual: {userStreaks.currentStreak} dias
      </h1>
      <h1 className="font-poppins font-normal italic text-white text-(length:--font-size-small)/(--font-size-medium)">
        Maior Sequência: {userStreaks.longestStreak} dias
      </h1>
    </>
  );
}

export default UserStreaks;
