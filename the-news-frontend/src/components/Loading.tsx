import { useEffect, useState } from 'react';
import Lottie from 'react-lottie-player';
import loadingAnimation from '../assets/animation/newsletter_animation.json';

interface LoadingProps {
  isLoading: boolean;
}

function Loading({ isLoading }: LoadingProps) {
  const [isPageLoading, setIsPageLoading] = useState(isLoading);

  useEffect(() => {
    setIsPageLoading(isLoading);
  }, [isLoading]);

  if (!isPageLoading) return null;

  return (
    <div className="flex justify-center items-center h-screen absolute">
      <div className="flex justify-center self-center h-screen w-screen relative bg-thenews-primary/5 backdrop-blur-xs">
        <Lottie loop animationData={loadingAnimation} play />
      </div>
    </div>
  );
}

export default Loading;
