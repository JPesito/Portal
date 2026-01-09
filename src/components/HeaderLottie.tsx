"use client";
import { useLottie } from "lottie-react";
import headerAnimation from "../../public/lotties/header.json";

export default function HeaderLottie() {
  const options = {
    animationData: headerAnimation,
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(options);

  return (
    // Contenedor para controlar el tamaño del Lottie
    <div className="w-full max-w-md mx-auto md:max-w-lg lg:max-w-xl xl:max-w-2xl drop-shadow-2xl">
      {View}
    </div>
  );
}