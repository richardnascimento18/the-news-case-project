import { useState } from 'react';
import { GraphData, GraphHeader } from '../../interfaces';
import GraphHeaderComponent from './GraphHeaderComponent';
import RechartsBarGraph from './RechartsBarGraph';

interface GraphProps {
  graphHeader: GraphHeader;
  data: GraphData[];
}

function Graph(graphProps: GraphProps) {
  const [selectedOption, setSelectedOption] = useState<string>(
    graphProps.graphHeader.options[0],
  );

  return (
    <div className="lg:w-[40%] max-lg:w-[100%] max-lg:mt-(--margin-component-extrasmall) flex flex-col items-center">
      <GraphHeaderComponent
        title={graphProps.graphHeader.title}
        options={graphProps.graphHeader.options}
        onOptionChange={setSelectedOption}
      />
      <RechartsBarGraph
        data={graphProps.data}
        currentOption={selectedOption}
        type={graphProps.graphHeader.type}
      />
    </div>
  );
}

export default Graph;
