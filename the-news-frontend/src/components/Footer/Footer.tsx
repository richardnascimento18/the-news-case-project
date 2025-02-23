import { Link } from '../../interfaces';
import Logo from '../Menu/Logo';
import LinkList from './LinkList';

interface FooterProps {
  page: 'user' | 'admin';
}

function Footer(footerProps: FooterProps) {
  const socialMedia: Link[] = [
    {
      name: 'Instagram',
      icon: 'instagram',
      link: 'https://www.instagram.com/thenews.cc',
    },
    {
      name: 'Twitter (x)',
      icon: 'twitter',
      link: 'https://twitter.com/thenews_br',
    },
  ];

  const pageLinks: Link[] = [
    {
      name: 'Attribuições ',
      link: '/atribuicoes',
    },
  ];

  return (
    <div className="flex w-[100%] mt-(--margin-component-big) mb-(--margin-component-big) border-t-2 border-thenews-primary">
      <div className="flex flex-row max-sm:flex-col max-sm:h-[400px] w-[100%] mt-(--margin-component-medium) justify-evenly items-evenly">
        <LinkList title="Links" links={pageLinks} />
        <LinkList title="Redes Sociais" links={socialMedia} />
        <Logo page={footerProps.page} />
      </div>
    </div>
  );
}

export default Footer;
