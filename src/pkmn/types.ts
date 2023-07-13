export type Target =
  | 'SELF'
  | 'ALLY'
  | 'SINGLE_OPPONENT'
  | 'BOTH_OPPONENTS'
  | 'SELF_AND_ALLY'
  | 'ALL';
export type ProcMoment = {
  moment:
    | 'BEFORE_MOVE'
    | 'AFTER_MOVE'
    | 'BEFORE_TURN'
    | 'AFTER_TURN'
    | 'BEFORE_SWITCH'
    | 'AFTER_SWITCH'
    | 'BEFORE_FAINT'
    | 'AFTER_FAINT'
    | 'BEFORE_HIT'
    | 'AFTER_HIT'
    | 'BEFORE_DAMAGE_CALCULATION'
    | 'AFTER_DAMAGE_CALCULATION'
    | 'BEFORE_STAT_MODIFICATION'
    | 'AFTER_STAT_MODIFICATION'
    | 'BEFORE_STAT_CALCULATION'
    | 'AFTER_STAT_CALCULATION'
    | 'BEFORE_STAT_STAGE_MODIFICATION'
    | 'AFTER_STAT_STAGE_MODIFICATION'
    | 'BEFORE_STAT_STAGE_CALCULATION'
    | 'AFTER_STAT_STAGE_CALCULATION'
    | 'BEFORE_STAT_STAGE_RESET'
    | 'AFTER_STAT_STAGE_RESET'
    | 'ON_DAMAGE_TAKEN'
    | 'ON_DAMAGE_DEALT'
    | 'ON_STAT_MODIFICATION'
    | 'ON_STAT_STAGE_MODIFICATION'
    | 'ON_STAT_STAGE_RESET'
    | 'ON_STAT_CALCULATION'
    | 'ON_STAT_STAGE_CALCULATION'
    | 'ON_MOVE_HIT'
    | 'ON_MOVE_MISS'
    | 'ON_MOVE_CRIT'
    | 'ON_MOVE_SUPER_EFFECTIVE'
    | 'ON_MOVE_NOT_VERY_EFFECTIVE'
    | 'ON_MOVE_IMMUNE'
    | 'ON_MOVE_DRAIN'
    | 'ON_MOVE_RECOIL'
    | 'ON_MOVE_FLINCH'
    | 'ON_MOVE_CONFUSE'
    | 'ON_MOVE_PARALYZE'
    | 'ON_MOVE_BURN'
    | 'ON_MOVE_POISON'
    | 'ON_MOVE_SLEEP'
    | 'ON_MOVE_FREEZE'
    | 'ON_MOVE_TRAP'
    | 'ON_MOVE_SEMI_INVULNERABLE'
    | 'ON_MOVE_CHARGE'
    | 'ON_MOVE_RECHARGE'
    | 'ON_MOVE_MULTI_HIT'
    | 'ON_MOVE_MULTI_TURN'
    | 'ON_MOVE_OHKO'
    | 'ON_MOVE_CRIT_HIT'
    | 'ON_ITEM_USE'
    | 'ON_ITEM_EFFECT'
    | 'ON_ITEM_REMOVE'
    | 'ON_ITEM_ADD'
    | 'ON_ITEM_CONSUME'
    | 'ON_ITEM_FLING'
    | 'ON_ITEM_FLING_MISS'
    | 'ON_ITEM_FLING_HIT'
    | 'ON_OBTAIN_POISON'
    | 'ON_OBTAIN_BURN'
    | 'ON_OBTAIN_PARALYSIS'
    | 'ON_OBTAIN_FREEZE'
    | 'ON_OBTAIN_SLEEP'
    | 'ON_OBTAIN_CONFUSION'
    | 'ON_OBTAIN_INFATUATION'
    | 'ON_OBTAIN_CURSE'
    | 'ON_OBTAIN_NIGHTMARE'
    | 'ON_OBTAIN_LEECH_SEED'
    | 'ON_OBTAIN_SEED'
    | 'ON_OBTAIN_PERISH_SONG'
    | 'ON_OBTAIN_TAUNT'
    | 'ON_OBTAIN_TORMENT'
    | 'ON_OBTAIN_DISABLE'
    | 'ON_OBTAIN_ENCORE'
    | 'ON_OBTAIN_HEAL_BLOCK'
    | 'ON_OBTAIN_YAWN'
    | 'ON_OBTAIN_IMPRISON';
  chance?: number;
  amount?: number;
};

export interface Ability {
  name: string;
  description: string;
  effect: Function;
  procMoment: ProcMoment;
}

export interface Nature {
  name: string;
  increasedStat: string;
  decreasedStat: string;
}

export interface Type {
  name: string;
  isWeakTo: Type[];
  isResistantTo: Type[];
  isImmuneTo: Type[];
}

export interface MoveCategory {
  name: string;
  isPhysical: boolean;
  isSpecial: boolean;
  isStatus: boolean;
}

export interface Move {
  name: string;
  description: string;
  basePower: number;
  type: Type;
  category: MoveCategory;
  accuracy: number;
  basePP: number;
  maxPP: number;
  effect: Function;
}

export interface Item {
  name: string;
  description: string;
  isConsumable: boolean;
  useCase: Function;
  effect: Function;
  procMoment: ProcMoment;
}

export interface HardStatus {
  name: string;
  description: string;
  effect: Function;
}

export interface SoftStatus {
  name: string;
  description: string;
  effect: Function;
}

export interface PokemonForme {
  name: string;
  types: Type[];
  abilities: Ability[];
  moves: Move[];
  baseStats: {
    hp: number;
    atk: number;
    def: number;
    spAtk: number;
    spDef: number;
    spd: number;
  };
  weight: number;
  height: number;
  genderRatio: number;
  catchRate: number;
  baseExpYield: number;
  evYield: {
    hp: number;
    atk: number;
    def: number;
    spAtk: number;
    spDef: number;
    spd: number;
  };
  baseFriendship: number;
  baseEggCycles: number;
  eggGroups: string[];
}

export interface DexEntry {
  name: string;
  formes: PokemonForme[];
  dexNumber: number;
  description: string;
  region: Region;
}

export interface Region {
  name: string;
}

export interface PokemonInstance {
  forme: PokemonForme;
  nickname: string | undefined;
  level: number;
  ivs: {
    hp: number;
    atk: number;
    def: number;
    spAtk: number;
    spDef: number;
    spd: number;
  };
  evs: {
    hp: number;
    atk: number;
    def: number;
    spAtk: number;
    spDef: number;
    spd: number;
  };
  nature: Nature;
  ability: Ability;
  moves: Move[];
  currentHP: number;
  hardStatus: HardStatus | undefined;
  softStatus: SoftStatus | undefined;
  item: Item | undefined;
  isShiny: boolean;
  isFainted: boolean;
}
