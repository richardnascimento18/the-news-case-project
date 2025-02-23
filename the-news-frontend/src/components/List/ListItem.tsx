import { ListData } from '../../interfaces';

interface ListItemProps {
  data: ListData[];
}

function ListItem(listItemProps: ListItemProps) {
  return (
    <div className="flex flex-col items-evenly w-[100%] mt-(--margin-component-xxsmall)">
      {listItemProps.data.map((listData, index) => {
        const badgeSource = `/assets/badges/${listData.additional}_badge.png`;

        return (
          <div
            key={index}
            className="flex flex-row justify-between items-center mb-(--margin-component-xxsmall) rounded-(--rounding-radius) h-(--padding-component-medium) bg-[#141414]"
          >
            <div className="justify-self-start ml-(--margin-component-extrasmall)">
              <ul className="flex flex-row">
                <li className="font-poppins font-normal text-(length:--font-size-medium) text-white">
                  {listData.leftData}
                </li>
                {listData.additional && (
                  <img
                    src={badgeSource}
                    className="ml-(--margin-component-xxsmall) w-[24px] h-[24px] self-center"
                  />
                )}
              </ul>
            </div>
            <div className="justify-self-end">
              <p className="font-poppins font-normal text-(length:--font-size-small) text-thenews-primary mr-(--margin-component-extrasmall)">
                {listData.rightData}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ListItem;
