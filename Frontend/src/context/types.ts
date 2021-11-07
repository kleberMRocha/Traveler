export interface ICardProps{
    location: string;
    picture: string;
    available_location: string | number;
    id: number | string;
    isTopAvaliation: boolean;
};

export interface IPlacesData{
    places:ICardProps[];
    sortPlacesBy: (string: 'default' | 'newer' | 'alphabetical') => void,
    handleSearch: (string: string) => void,
    isAlphabetical: boolean
}