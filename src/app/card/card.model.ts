import { v4 as uuidv4 } from 'uuid';

export class Card {
    id: string;

    constructor(public readonly deckId: string, public readonly question: string, public readonly answer: string){
        this.id = uuidv4();
    }
}