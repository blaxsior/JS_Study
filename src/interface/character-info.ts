interface CharacterSkillInfo {
    name: string,
    level: number,
    unlock: string,
    description : string
}

interface CharacterTallentInfo {
    name: string,
    unlock: string,
    description : string,
    type: string
}

export default interface CharacterInfo {
    affiliation: string;
    birthday :string;
    constellation: string;
    constellations: CharacterSkillInfo[];
    description: string;
    name: string;
    nation: string;
    passiveTalents:  CharacterSkillInfo[];
    rarity: number;
    skillTalents: CharacterTallentInfo[];
    vision: string;
    vision_key: string;
    weapon: string;
    weapon_type: string;
}