import { Link } from '../../interfaces';

function LinkItem(linkItemProps: Link) {
  const imgPath = `/assets/icons/${linkItemProps.icon}.svg`;
  return (
    <>
      <div className="flex flex-row items-center cursor-pointer mb-(--margin-component-extrasmall)">
        {linkItemProps.icon && (
          <div className="mr-(--margin-component-xxsmall)" id="icon">
            <img
              src={imgPath}
              alt={linkItemProps.name}
              className="max-lg:w-[24px] max-lg:h-[24px]"
            />
          </div>
        )}
        <a href={linkItemProps.link} target="__blank">
          <h1 className="font-poppins font-normal text-(length:--font-size-medium) text-thenews-primary max-lg:text-(length:--font-size-medium)">
            {linkItemProps.name}
          </h1>
        </a>
      </div>
    </>
  );
}

export default LinkItem;
