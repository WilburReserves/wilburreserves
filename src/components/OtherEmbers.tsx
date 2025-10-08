import { createClient } from "@/prismicio";
import { TransitionLink } from "./TransistionLink";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicText } from "@prismicio/react";
import { formatPrice } from "@/utils/formatter";



type OtherEmbersProps = {
    currentEmberUID: string;
}

export const OtherEmbers = async (
    { currentEmberUID }: OtherEmbersProps
) => {
    const client = createClient();
    const allEmbers = await client.getAllByType("embers")

    const otherEmbers = allEmbers.filter((ember) => ember.uid !== currentEmberUID)

    return (
        <div className="container mx-auto px-4">
            <h2 className="font-display mb-8 text-3xl md:text-4xl text-white">You may also like</h2>

             <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {otherEmbers.map((ember) => (
          <li key={ember.id}>
            <TransitionLink document={ember} className="group">
              <div className="relative aspect-square w-full transition-transform duration-500 group-hover:scale-105">
                <PrismicNextImage
                  field={ember.data.bottle_image}
                  width={600}
                  height={600}
                  className="h-auto w-full"
                />
              </div>

              <div className="mt-8 space-y-1 text-white">
                <h3 className="font-display text-2xl">
                  <PrismicText field={ember.data.title} />
                </h3>
                <p className="text-sm text-neutral-400">{ember.data.edition}</p>
                <p className="text-base font-light">
                  {formatPrice(ember.data.price)}
                </p>
              </div>
            </TransitionLink>
          </li>
        ))}
      </ul>


        </div>
    )
    }