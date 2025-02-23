import { ListInterface } from '../../interfaces';
import List from './List';

interface ListSectionProps {
  lists: ListInterface[];
  customStyle?: string;
}

function ListSection(listSectionProps: ListSectionProps) {
  function loadLists() {
    return listSectionProps.lists.map((list, index) => {
      if (listSectionProps.customStyle) {
        return (
          <List
            listHeader={list.listHeader}
            data={list.data}
            key={index}
            customStyle={listSectionProps.customStyle}
          />
        );
      }

      return <List listHeader={list.listHeader} data={list.data} key={index} />;
    });
  }

  return (
    <div className="flex flex-row max-lg:flex-col w-[100%] justify-between max-lg:justify-center items-start max-lg:items-center mt-(--margin-component-big)">
      {loadLists()}
    </div>
  );
}

export default ListSection;
