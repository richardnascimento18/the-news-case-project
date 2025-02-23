interface ListHeaderProps {
  title: string;
  subtitle?: string;
  type: string;
}

function ListHeaderComponent(listHeaderProps: ListHeaderProps) {
  return (
    <>
      <h1 className="font-poppins font-medium text-(length:--font-size-large) text-white max-lg:text-(length:--font-size-medium)">
        {listHeaderProps.title}
      </h1>
      {listHeaderProps.subtitle && (
        <p className="font-poppins font-normal text-(length:--font-size-small) text-thenews-primary">
          {listHeaderProps.subtitle}
        </p>
      )}
      <h2 className="font-poppins font-medium text-(length:--font-size-small) text-white">
        - {listHeaderProps.type} -
      </h2>
    </>
  );
}

export default ListHeaderComponent;
