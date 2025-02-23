import { StatisticInterface } from '../../interfaces';
import StatisticList from './StatisticList';

interface StatisticProps {
  statistic: StatisticInterface;
}

function Statistic(statisticProps: StatisticProps) {
  return (
    <div className="lg:w-[40%] max-lg:w-[100%] max-lg:mt-(--margin-component-extrasmall) flex flex-col items-center">
      <h1 className="font-poppins font-medium text-(length:--font-size-large) text-white max-lg:text-(length:--font-size-medium)">
        {statisticProps.statistic.title}
      </h1>

      <StatisticList data={statisticProps.statistic.data} />
    </div>
  );
}

export default Statistic;
