import React from 'react';
import { FiSearch } from 'react-icons/fi';
import style from '../../../styles/components/InputSearch.module.css';
import { cloneObj } from '../../utils/cloneObj';

interface IIputSearch{
    info: any[];
    handleFilterInfo: ([]:any) => void
}

const InputSearch: React.FC<IIputSearch> = ({info, handleFilterInfo}) => {
    
    const handleSearch = (value: string) => {

        if(value.length === 0){
         let defaut = cloneObj(info);
         handleFilterInfo(defaut);
         return;
        }

        if (value.length < 2) return;
        let clone = cloneObj(info);
        let regex = new RegExp(value, 'gi');
        clone = clone.filter((p: { place_name?: String, attraction_name?:string }) => {
          
          if(p.place_name){
            return p.place_name.match(regex);
          }

          if(p.attraction_name){
            return p.attraction_name.match(regex);
          }
          
        });
        handleFilterInfo(clone);
    };

  return (
    <form>
      <div className={style.inputSearch}>
        <FiSearch /> <input 
            type="search" 
            placeholder="procurar um lugar" 
            onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
    </form>
  );
};

export default InputSearch;
