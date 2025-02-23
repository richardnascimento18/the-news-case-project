import Footer from '../components/Footer/Footer';
import Logo from '../components/Menu/Logo';

function Attributions() {
  return (
    <>
      <ul className="thenews-container flex flex-col items-center">
        <Logo page="user" />
        <h1 className="font-poppins font-normal text-thenews-primary text-(length:--font-size-xl) mb-(--margin-component-medium) mt-(--margin-component-medium) max-md:text-(length:--font-size-large) max-sm:text-(length:--font-size-small)">
          Grandes agradecimentos pelos ícones e imagens!
        </h1>
        <div>
          <li>
            <a
              href="https://www.freepik.com/search"
              className="cursor-pointer mb-(--margin-component-xxsmall) text-white font-montserrat text-(length:--font-size-medium)"
            >
              Icon by justicon
            </a>
          </li>
          <li className="mb-(--margin-component-xxsmall) text-white font-montserrat text-(length:--font-size-medium)">
            Foto de Markus Winkler na Unsplash
          </li>
          <li>
            <a
              href="https://www.freepik.com/search"
              className="cursor-pointer mb-(--margin-component-xxsmall) text-white font-montserrat text-(length:--font-size-medium)"
            >
              Icon by andinur
            </a>
          </li>
          <li>
            <a
              href="https://www.freepik.com/search"
              className="cursor-pointer mb-(--margin-component-xxsmall) text-white font-montserrat text-(length:--font-size-medium)"
            >
              Icon by gravisio
            </a>
          </li>
          <li>
            <a
              href="https://www.freepik.com/search"
              className="cursor-pointer mb-(--margin-component-xxsmall) text-white font-montserrat text-(length:--font-size-medium)"
            >
              Icon by Iconic Panda
            </a>
          </li>
          <li>
            <a
              href="https://www.freepik.com/search"
              className="cursor-pointer mb-(--margin-component-xxsmall) text-white font-montserrat text-(length:--font-size-medium)"
            >
              Icon by Anggara
            </a>
          </li>
        </div>
      </ul>

      <Footer page="user" />
    </>
  );
}

export default Attributions;
