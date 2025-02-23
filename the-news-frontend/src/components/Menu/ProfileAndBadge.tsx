interface ProfileProps {
  email: string;
  badge: string;
}

function ProfileAndBadge(profileProps: ProfileProps) {
  const badgeSource = `/assets/badges/${profileProps.badge}_badge.png`;
  return (
    <div className="flex items-center">
      <img src={badgeSource} className="w-[24px] h-[24px]" />
      <h1 className="ml-(--margin-component-xxsmall) text-white font-normal font-poppins text-(length:--font-size-medium) max-xxs:text-(length:--font-size-small)">
        {profileProps.email}
      </h1>
    </div>
  );
}

export default ProfileAndBadge;
