import { useState } from 'react';
import Loading from '../components/Loading';
import Lottie from 'react-lottie-player';
import loginBackground from '../assets/bg/login_background.jpg';
import animatedIllustration from '../assets/animation/login_page_animation.json';
import Form from '../components/Form/Form';

function Login() {
  const [loading] = useState(false);

  return (
    <>
      <Loading isLoading={loading} />
      <div
        className="flex justify-center items-center h-screen bg-cover bg-center relative after:bg-opacity-50 after:bg-thenews-black/80 after:absolute after:w-screen after:h-screen after:top-0 after:left-0 after:z-0"
        style={{ backgroundImage: `url(${loginBackground})` }}
      >
        <div className="flex flex-row relative z-10 w-screen max-h-[100%] h-[750px] max-xs:absolute max-xs:h-[100%] mx-(--section-x-spacing) bg-thenews-black rounded-(--rounding-radius)">
          <div className="w-[100%] h-[100%] bg-amber-50 rounded-(--rounding-radius) max-lg:hidden">
            <Lottie loop animationData={animatedIllustration} play />
          </div>
          <div className="flex flex-col w-[100%] h-[100%] justify-evenly rounded-(--rounding-radius)">
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-(length:--font-size-logo) max-xs:text-(length:--font-size-xxl) font-normal text-thenews-primary font-verdana ">
                the news.
              </h1>
              <p className="text-white text-(length:--font-size-medium) max-xs:text-(length:--font-size-small) font-poppins mt-(--margin-component-extrasmall)">
                Faça login para continuar.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Form />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
