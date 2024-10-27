import { HeroType } from "./hero.type";

export interface Hero {
  id?: string;
  name: string;
  age: number;
  type: HeroType.GUERREIRO | HeroType.MAGO | HeroType.MONJE | HeroType.NINJA
  attackStrategy?: string;
}
