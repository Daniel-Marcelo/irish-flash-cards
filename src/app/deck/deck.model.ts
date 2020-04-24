export interface Deck {
    name: string;
    parentDeckIds: string[] | null;
    immediateParentDeckId: string | null;
}

export const newDeck = () => ({ name: '', parentDeckIds: null, immediateParentDeckId: null} as Deck)

export interface DeckDoc extends Deck {
    id: string;
}
