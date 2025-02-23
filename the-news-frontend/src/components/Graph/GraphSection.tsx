import { GraphInterface } from '../../interfaces';
import Graph from './Graph';

interface GraphSectionProps {
  graphs: GraphInterface[];
}

function GraphSection(graphSectionProps: GraphSectionProps) {
  function loadGraphs() {
    return graphSectionProps.graphs.map((graph, index) => {
      return (
        <Graph graphHeader={graph.graphHeader} data={graph.data} key={index} />
      );
    });
  }

  return (
    <div className="flex flex-row max-lg:flex-col w-[100%] justify-between max-lg:justify-center items-start max-lg:items-center mt-(--margin-component-big)">
      {loadGraphs()}
    </div>
  );
}

export default GraphSection;
