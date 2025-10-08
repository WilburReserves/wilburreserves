import { Content } from "@prismicio/client";
import { IconType } from "react-icons";
import { GiFluffyCloud } from "react-icons/gi";
import { LuCrown, LuFlame, LuGem, LuTreePine, LuZap } from "react-icons/lu";

type AttributeData = {
    label: string;
    Icon: IconType;
}


const TATSE_PROFILES: Record<Content.EmbersDocumentData["taste_profile"], AttributeData> = {
    spicy: {label: "Spicy & Smoky", Icon: LuFlame},
    sweet: {label: "Vanilla & Fruity", Icon: GiFluffyCloud},
    woody: {label: "Woody & Herbal", Icon: LuTreePine},
}

const MOODS: Record<Content.EmbersDocumentData["mood"], AttributeData> = {
    smooth: {label: "Smooth & Approachable", Icon: LuZap},
    bold: {label: "Brave & Bold", Icon: LuGem},
    luxurious: {label: "Luxury & Class", Icon: LuCrown},
}

type EmbersAttributesProps = {
    tasteProfile: Content.EmbersDocumentData["taste_profile"];
    mood: Content.EmbersDocumentData["mood"];
    className?: string;
};


export const EmberAttributes = ({tasteProfile: providedTasteProfile, mood: providedMood, className}: EmbersAttributesProps) => {
    const tasteProfile = TATSE_PROFILES[providedTasteProfile];
    const mood = MOODS[providedMood];

    return (
       <div className={className}>
           <p className="mb-2 text-base font-semibold uppercase">Features</p>
           <div className="grid gap-2">
                <p className="flex items-center gap-2">
                    <tasteProfile.Icon className="size-6"/>
                    {tasteProfile.label}
                </p>
                 <p className="flex items-center gap-2">
                    <mood.Icon className="size-6"/>
                    {mood.label}
                </p>
           </div>
       </div>
    )
    

}