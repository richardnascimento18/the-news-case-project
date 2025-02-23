interface LogoProps {
  page: 'user' | 'admin';
}

function Logo(logoProps: LogoProps) {
  function loadLogo() {
    if (logoProps.page === 'user') {
      return (
        <div
          id="logo"
          className="flex flex-row justify-center items-center cursor-pointer"
        >
          <span className="text-(length:--font-size-logo)/(--font-size-logo) font-verdana font-normal text-thenews-primary">
            the
          </span>
          <div className="flex flex-col ml-(--margin-component-xxsmall)">
            <span className="font-verdana font-normal text-thenews-primary text-(length:--font-size-logo-small)/(--font-size-logo-small)">
              news
            </span>
            <span className="font-verdana font-normal text-white text-(length:--font-size-logo-small)/(--font-size-logo-small)">
              user.
            </span>
          </div>
        </div>
      );
    }

    return (
      <div
        id="logo"
        className="flex flex-row justify-center items-center cursor-pointer"
      >
        <span className="text-(length:--font-size-logo)/(--font-size-logo) font-verdana font-normal text-thenews-primary">
          the
        </span>
        <div className="flex flex-col ml-(--margin-component-xxsmall)">
          <span className="font-verdana font-normal text-thenews-primary text-(length:--font-size-logo-small)/(--font-size-logo-small)">
            news
          </span>
          <span className="font-verdana font-normal text-white text-(length:--font-size-logo-small)/(--font-size-logo-small)">
            admin.
          </span>
        </div>
      </div>
    );
  }

  return loadLogo();
}

export default Logo;
