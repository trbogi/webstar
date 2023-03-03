export interface Character{
    id: string,
    name: string,
    side: string,
    force: {
        power: string,
        midichlorian: number
    },
    createdTimestamp : number,
    description : string
}