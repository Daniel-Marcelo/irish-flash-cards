export interface Deck {
    name: string;
    parentDeckId: string | null;
}

export interface DeckDoc extends Deck {
    id: string;
}

export const isExistingDeck = (deck: Deck | DeckDoc): deck is DeckDoc => !!(deck as DeckDoc).id 