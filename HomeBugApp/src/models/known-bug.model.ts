import { RegionModel } from "./region.model";
import { Taxonomy } from "./taxonomy.model";

export interface KnownBugModel{
    id: number;
    common_name: string;
    latin_name: string;

    picture_urls: string[];
    
    taxonomy: Taxonomy;
    overview: string;
    
    regions: RegionModel[];
    habitats: string[];
    
    behaviour: string;
    body_type: string;
    color: string;
    diet: string;
    no_legs: number;
    size: string;
    
    danger_to_humans: boolean;
    stings: boolean;
    venomous: boolean;
    wings: boolean;
    bites: boolean;
}