import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class HabitatsService {

    private readonly habitats = {
        grass: "🌾 Grasslands",
        forest: "🌳 Forests",
        garden: "🌺 Gardens",
        wet: "🌊 Wetlands",
        desert: "🏜️ Deserts",
        mountain: "⛰️ Mountains",
        rainforest: "🌴 Tropical Rainforests",
        agro: "🌾 Agricultural Fields"
    }

    getLabel(code: string): string {
        if (code in this.habitats) {
            return this.habitats[code as keyof typeof this.habitats];
        }
        return "Unknown code";
    }

    getCode(label: string): string {
        const entry = Object.entries(this.habitats).find(([_, v]) => v === label);
        return entry ? entry[0] : 'Unknown label';
    }

    getAll() {
        return this.habitats;
    }

}