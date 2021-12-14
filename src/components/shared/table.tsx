import React, { useEffect, useState } from 'react';
import style from '../../../styles/components/Table.module.css';
import { FiCheck, FiX, FiEdit,  FiTrash } from 'react-icons/fi';
import { format } from 'date-fns';
import InputSearch from './InputSearch';
import api from '../../services/axios';
import { toast } from 'react-toastify';
import LoaderPage from './LoaderPage';


interface ITableInfos {
  type: 'places' | 'attacttion' | 'review';
  info: any[];
}

const TableInfos: React.FC<ITableInfos> = ({ type, info }) => {

  useEffect(() => {
    setInfo(info);
  },[info]);

  interface IDeletePlace{
    place_name: string,
    id: string
  }

  const [infoTable,setInfo] = useState(info);
  const [confirmDelete, setDeleteConfirm] = useState<IDeletePlace>({} as IDeletePlace);
  const  [isLoading, setIsLoading] = useState(false);

  const handleDeletePlaces = async (id:string) => {
     setIsLoading(true);

      try {
       await api.delete(`/places/${id}`);
       const newTable = infoTable.filter( p => p.id !== id);
       setInfo(newTable);
       toast.success('Lugar excluido com sucesso');
       setDeleteConfirm({} as IDeletePlace);
       setIsLoading(false);
      } catch (error) {
        console.log(error);
        toast.error('Houve um erro ao tentar exlcuir');
        setIsLoading(false);
      }
      
  };

  const headers = {
    places: [
      'Lugar',
      'Resumo',
      'Imagem',
      'Ultima Atualização',
      'Editar',
      'Deletar',
    ],
    attacttion: [],
    review: [],
  };

  return (
    <>
    <InputSearch info={info} handleFilterInfo={setInfo}  />
    
    {
     isLoading ? <LoaderPage /> :
      confirmDelete.place_name &&
      <div className={style.confirmDelete}>
      Certeza que deseja excluir <u>{confirmDelete.place_name}?</u>
      <b>Essa ação será permanente</b>
      <button
      onClick={() => handleDeletePlaces(confirmDelete.id)}
      >Confirmar</button>
      </div>

    }
   

    <table className={style.tableinfo}>
      <thead>
        <tr>
          {headers[type].map((th) => (
            <th key={th}>{th}</th>
          ))}
        </tr>
      </thead>
      <tbody>
          {!infoTable.length && <tr><td colSpan={8}> Nada encontrado </td></tr>}
        {infoTable.map((td) => {
          return (
              <tr key={td.id}>
                <td>{td.place_name}</td>
                <td>{td.place_desc.substring(0,50)} ... </td>
                <td>
                  {td.img_url.length ? (
                    <FiCheck color="green" />
                  ) : (
                    <FiX color="tomato" />
                  )}
                </td>
                <td>{format(new Date(td.updated_at), 'dd/MM/yyyy')}</td>
                <td>
                  <button>
                    <FiEdit color="#bb7c08" />
                  </button>
                </td>
                <td>
                  <button onClick={() => setDeleteConfirm(td)}>
                    <FiTrash color="tomato" />
                  </button>
                </td>
              </tr>
          );
        })}
      </tbody>
    </table>
    </>
  );
};

export default TableInfos;
