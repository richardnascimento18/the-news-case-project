interface UserRankProps {
  rank: string;
}

function UserRank(userRankProps: UserRankProps) {
  return (
    <h1 className="text-white font-normal font-poppins text-(length:--font-size-small)">
      Rank #{userRankProps.rank}
    </h1>
  );
}

export default UserRank;
