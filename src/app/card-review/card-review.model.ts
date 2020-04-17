import { Card } from '../card/card.model';

export enum ReviewDifficulty {
    Easy = 'easy',
    Good = 'good',
    Hard = 'hard',
    VeryHard = 'veryHard'
}

export interface CardReview {
    card: Card
    reviewInfo: ReviewInfo[]
}

export class ReviewInfo {
    readonly date: Date;

    constructor(public readonly level: ReviewDifficulty) {
        this.date = new Date();
    }
}