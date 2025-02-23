import { StatisticListItem } from '../../interfaces';

interface StatisticListItemProps {
  dataSet: StatisticListItem;
}

function StatisticListItemComponent(statisticListItem: StatisticListItemProps) {
  return (
    <li className="flex flex-row w-[100%] justify-between items-center mt-(--margin-component-extrasmall)">
      <h1 className="font-poppins font-light text-white text-(length:--font-size-medium)">
        {statisticListItem.dataSet.statisticName}
      </h1>
      <span className="font-poppins font-semibold text-thenews-primary text-(length:--font-size-small)">
        {statisticListItem.dataSet.statisticValue}
      </span>
    </li>
  );
}

export default StatisticListItemComponent;
