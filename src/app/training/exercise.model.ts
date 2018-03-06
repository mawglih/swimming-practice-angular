export interface Exercise {
    id: string;
    name: string;
    duration: number;
    distance: number;
    date?: Date;
    state?: 'completed' | 'cancelled' | null;
}