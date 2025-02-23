import { StatisticListItem } from '../../interfaces';
import StatisticListItemComponent from './StatisticListItemComponent';

interface StatisticListProps {
  data: StatisticListItem[];
}

function StatisticList(statisticListProps: StatisticListProps) {
  return (
    <ul className="flex flex-col w-[100%] mt-(--margin-component-extrasmall)">
      {statisticListProps.data.map((dataSet, index) => (
        <StatisticListItemComponent key={index} dataSet={dataSet} />
      ))}
    </ul>
  );
}

export default StatisticList;
