import { StatisticInterface } from '../../interfaces';
import Statistic from './Statistic';

interface StatisticsSectionProps {
  statistics: StatisticInterface[];
}

function StatisticsSection(statisticsSectionProps: StatisticsSectionProps) {
  return (
    <div className="flex flex-row max-md:flex-col w-[100%] justify-between max-md:justify-center items-start max-md:items-center mt-(--margin-component-big)">
      {statisticsSectionProps.statistics.map((statistic) => (
        <Statistic statistic={statistic} />
      ))}
    </div>
  );
}

export default StatisticsSection;
