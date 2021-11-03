export interface ICardProps{
    location: string;
    picture: string;
    available_location: string | number;
    id: number | string
};

export interface IPlacesData{
    places:ICardProps[];
    sortPlacesBy: (order:boolean) => void
}