
export interface Card {
    deckIds: string[],
    immediateParentDeckId: string,
    question: string,
    answer: string
}

export interface CardDoc extends Card {
    id: string,
}