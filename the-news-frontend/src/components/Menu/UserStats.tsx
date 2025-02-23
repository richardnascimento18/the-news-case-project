import logOut from '../../functions/logOut';
import { User } from '../../interfaces/';
import ProfileAndBadge from './ProfileAndBadge';
import UserLevel from './UserLevel';
import UserRank from './UserRank';
import UserStreaks from './UserStreaks';

interface UserStatsProps {
  user: User;
}

function UserStats(UserStatsProps: UserStatsProps) {
  return (
    <div className="menu-right flex flex-col">
      <ProfileAndBadge
        email={UserStatsProps.user.email}
        badge={UserStatsProps.user.badge}
      />

      <div className="flex flex-col items-center">
        <div className="flex flex-row max-xxs:flex-col items-center self-end justify-between w-[100%] mt-(--margin-component-xxsmall)">
          <UserLevel
            level={UserStatsProps.user.level}
            exp={UserStatsProps.user.exp}
          />
          <UserRank rank={UserStatsProps.user.rank} />
        </div>
        <div className="flex flex-row max-xxs:flex-col items-center self-end justify-between w-[100%] mt-(--margin-component-xxsmall)">
          <UserStreaks
            currentStreak={UserStatsProps.user.currentStreak}
            longestStreak={UserStatsProps.user.longestStreak}
          />
        </div>
        <div className="flex flex-row max-xxs:flex-col items-center self-end justify-between w-[100%] mt-(--margin-component-xxsmall)">
          <p className="cursor-pointer text-white" onClick={() => logOut()}>
            Log Out
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserStats;
