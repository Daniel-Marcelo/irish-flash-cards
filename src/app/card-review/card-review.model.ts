export enum ReviewDifficulty {
    Easy = 'easy',
    Good = 'good',
    Hard = 'hard',
    VeryHard = 'veryHard'
}

export interface CardReview {
    cardId: string,
    date: Date;
    level: ReviewDifficulty
}