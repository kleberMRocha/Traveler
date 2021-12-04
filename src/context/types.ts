export interface ICardProps{
    location: string;
    picture: string;
    available_location: string | number;
    id: number | string;
    isTopAvaliation?: boolean;
};

export interface IPlacesData{
    places:ICardProps[];
    sortPlacesBy: (string: 'default' | 'newer' | 'alphabetical') => void,
    handleSearch: (string: string) => void,
    isAlphabetical: boolean
}

export interface IModal{
    isOpen:boolean;
    handleOpenModal: (value:boolean) => void;
    handleNextStep: (value:number) => void;
    steps: number;
    handleSetRate: (value:number) => void;
    rate: number;
}

export interface IUser{
    id: string;
    email:string;
    firstName: string;
}
export interface IAuth{
    signout: () => void,
    setAuth: (auth: {token:string, user: IUser }) => void,
    isAuth: boolean;
    token: string;
    user: IUser
}