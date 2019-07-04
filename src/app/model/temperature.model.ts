export interface TemperatureModel {
    id: string;
    values: [
        {
            date: Date,
            temperature: number
        }
    ]
}