import { ButtonLink } from "@/components/ButtonLink";
import { EmberAttributes } from "@/components/EmberAttributes";
import { FadeIn } from "@/components/FadeIn";
import { createClient } from "@/prismicio";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicText } from "@prismicio/react";
import { HiPlus } from "react-icons/hi2";

type EmberDisplayProps = {
    id: string;
}

export const EmberDisplay = async ({id}: EmberDisplayProps) => {
    const client = createClient();
    const ember = await client.getByID<Content.EmbersDocument>(id);

    return (
        <FadeIn className="relative grid min-h-[85vh] w-full translate-y-20 items-center justify-items-start border border-white/10 p-4 text-left md:p-14 lg:p-20" vars={{duration: 2.5}} start="top 50%">
            <div className="absolute inset-0 z-0">
                <PrismicNextImage field={ember.data.feature_image} alt="" className="object-cover opacity-40 md:opacity-100" fill width={1150} quality={90}/>

            </div>
            <FadeIn className="relative z-10 grid translate-y-8" vars={{duration: 3, delay: .8}} start="top 50%">
                <h3 className="font-display mb-3 text-5xl md:text-6xl lg:text-7xl">
                    <PrismicText field={ember.data.title}/>
                </h3>
                <p className="mb-8 text-base font-semibold text-gray-300">
                    {ember.data.edition}
                </p>
                
                <div className="mb-10 max-w-md text-lg text-gray-300">
                    <PrismicText field={ember.data.description} />
                </div>

                <EmberAttributes 
                    tasteProfile={ember.data.taste_profile}
                    mood={ember.data.mood}
                    className="mb-10"
                />

                <div className="flex flex-wrap gap-2">
                    <ButtonLink document={ember} variant="Secondary">
                        Discover
                    </ButtonLink>

                    <ButtonLink href="#" variant="Primary">
                        <HiPlus className="mr-2"/><span>Pre-order</span>
                    </ButtonLink>
                </div>
            </FadeIn>
        </FadeIn>
    )
}