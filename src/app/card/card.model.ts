
export interface Card {
    deckIds: string[],
    question: string,
    answer: string
}

export interface CardDoc extends Card {
    id: string,
}