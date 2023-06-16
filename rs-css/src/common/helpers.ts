import { LEVELS } from '../data/levels';

export function getMarkUp(level: number): string {
    const markup: string = LEVELS[level].boardMarkup;
    return markup;
}
