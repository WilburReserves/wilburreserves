import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

import { gsap } from "gsap";
import { Bounded } from "@/components/Bounded";
import { useGSAP } from "@gsap/react";
import { FadeIn } from "@/components/FadeIn";
import { RevealText } from "@/components/RevealText";
import { ButtonLink } from "@/components/ButtonLink";


gsap.registerPlugin(useGSAP);

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {



  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative min-h-screen overflow-hidden bg-neutral-950"
    >   
    <FadeIn vars={{ scale: 1, opacity: .5 }} className="bg-image absolute inset-0 motion-safe:scale-125">

      <PrismicNextImage 
        field={slice.primary.image} 
        alt="" 
        priority 
        fill 
        className="object-cover motion-reduce:opacity-50"
        />
      </FadeIn>

    <div className="relative flex h-screen flex-col justify-center">
      <RevealText field={slice.primary.heading} id="hero-heading" className="max-w-xl text-6xl leading-none text-neutral-50 md:text-7xl lg:text-8xl font-display" 
        staggerAmount={.2}
        duration={1.7}
        as="h1"
      />

      <FadeIn vars={{ delay: 1, duration: 1.3 }} className="mt-6 max-w-md text-lg text-neutral-100 translate-y-8">

      <PrismicRichText field={slice.primary.body} />
      </FadeIn>
      <FadeIn className="mt-8 translate-y-5 opacity-0" vars={{ delay: 1.7, duration: 1.1 }}>

      {slice.primary.button.map((link) => (
        <ButtonLink
          key={link.key}
          field={link}
          className="w-fit"
          variant="Secondary"
        />
      ))}
      </FadeIn>
    </div>

    </Bounded>
  );
};

export default Hero;
