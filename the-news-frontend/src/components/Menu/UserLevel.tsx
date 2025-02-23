interface UserLevelProps {
  level: number;
  exp: number;
}

function UserLevel(userLevelProps: UserLevelProps) {
  return (
    <div className="flex flex-row items-center">
      <h1 className="mr-(--margin-component-xxsmall) text-white font-normal font-poppins text-(length:--font-size-small)">
        lvl. {userLevelProps.level}
      </h1>
      <div
        className="w-[100px] h-[8px] bg-thenews-primary-250 rounded-(--rounding-radius) relative after:h-[8px] after:bg-thenews-primary after:rounded-(--rounding-radius) after:absolute after:left-0 after:top-0"
        style={{ ['--exp-progress' as any]: `${userLevelProps.exp}px` }}
        id="exp_bar"
      ></div>
    </div>
  );
}

export default UserLevel;
