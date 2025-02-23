import { Link } from '../../interfaces';
import LinkItem from './LinkItem';

interface LinkListProps {
  title: string;
  links: Link[];
}

function LinkList(linkListProps: LinkListProps) {
  return (
    <div className="flex flex-col ">
      <h1 className="font-poppins text-(length:--font-size-xl) text-white self-center max-lg:text-(length:--font-size-big)">
        {linkListProps.title}
      </h1>
      <div className="flex flex-col justify-center items-center">
        {linkListProps.links.map((link) => (
          <LinkItem name={link.name} icon={link.icon} link={link.link} />
        ))}
      </div>
    </div>
  );
}

export default LinkList;
