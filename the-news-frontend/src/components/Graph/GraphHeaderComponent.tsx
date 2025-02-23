import { useEffect, useState } from 'react';

interface GraphHeaderProps {
  title: string;
  options: string[];
  onOptionChange: (selected: string) => void;
}

function GraphHeaderComponent(graphHeaderProps: GraphHeaderProps) {
  const [selectedOption, setSelectedOption] = useState<string>('');

  useEffect(() => {
    setSelectedOption(graphHeaderProps.options[0]);
    graphHeaderProps.onOptionChange(graphHeaderProps.options[0]);
  }, [graphHeaderProps.options]);

  function loadOptions(option: string, key: number) {
    return (
      <option key={option + key} value={option} className="bg-thenews-black">
        {option}
      </option>
    );
  }

  function handleStateChange(newOptionSelected: string) {
    if (newOptionSelected !== selectedOption) {
      setSelectedOption(newOptionSelected);
      graphHeaderProps.onOptionChange(newOptionSelected);
    }
  }

  return (
    <>
      <h1 className="font-poppins font-medium text-(length:--font-size-large) text-white max-lg:text-(length:--font-size-medium)">
        {graphHeaderProps.title}
      </h1>
      <h2 className="font-poppins font-medium text-(length:--font-size-small) text-white">
        -{' '}
        <select
          name="select"
          className="appearance-none text-white focus:outline-none"
          value={selectedOption}
          onChange={(event) => handleStateChange(event.target.value)}
        >
          {graphHeaderProps.options.map((option, key) => {
            return loadOptions(option, key);
          })}
        </select>{' '}
        -
      </h2>
    </>
  );
}

export default GraphHeaderComponent;
