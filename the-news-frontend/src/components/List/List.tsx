import { ListData, ListHeader } from '../../interfaces';
import ListHeaderComponent from './ListHeader';
import ListItem from './ListItem';

interface ListProps {
  listHeader: ListHeader;
  data: ListData[];
  customStyle?: string;
}

function List(listProps: ListProps) {
  return (
    <div
      className={
        'lg:w-[40%] max-lg:w-[100%] max-lg:mt-(--margin-component-extrasmall) flex flex-col items-center ' +
        listProps.customStyle
      }
    >
      <ListHeaderComponent
        title={listProps.listHeader.title}
        subtitle={listProps.listHeader.subtitle}
        type={listProps.listHeader.type}
      />
      <ListItem data={listProps.data} />
    </div>
  );
}

export default List;
