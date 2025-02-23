import {
  LineChart,
  Line,
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { GraphData } from '../../interfaces';

interface RechartsBarGraphProps {
  data: GraphData[];
  currentOption: string;
  type: string;
}

function RechartsBarGraph(rechartsBarGraphProps: RechartsBarGraphProps) {
  const graph = rechartsBarGraphProps.data.find(
    (graph) => graph.option === rechartsBarGraphProps.currentOption,
  );

  if (!graph) {
    return null;
  }

  return (
    <ResponsiveContainer
      width="100%"
      height={560}
      className="mt-(--margin-component-xxsmall)"
    >
      {rechartsBarGraphProps.type === 'bar' ? (
        <BarChart
          data={graph.graphData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="x"
            label={{ value: graph.xName, position: 'insideBottom', dy: 10 }}
          />
          <YAxis
            label={{ value: graph.yName, angle: -90, position: 'insideLeft' }}
          />
          <Tooltip />
          <Bar
            dataKey="y"
            name={graph.yName}
            fill="#ffcf00"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
        </BarChart>
      ) : (
        <LineChart
          data={graph.graphData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="x"
            label={{ value: graph.xName, position: 'insideBottom', dy: 10 }}
          />
          <YAxis
            label={{ value: graph.yName, angle: -90, position: 'insideLeft' }}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="y"
            name={graph.yName}
            stroke="#ffcf00"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      )}
    </ResponsiveContainer>
  );
}

export default RechartsBarGraph;
