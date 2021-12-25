import React, { useEffect, useState } from 'react';
import style from '../../../styles/components/Table.module.css';
import { FiCheck, FiX, FiEdit, FiTrash, FiCheckCircle, FiArrowLeft } from 'react-icons/fi';
import { format } from 'date-fns';
import InputSearch from './InputSearch';
import api from '../../services/axios';
import { toast } from 'react-toastify';
import LoaderPage from './LoaderPage';
import { useModal } from '../../context/useModal';
import { cloneObj } from '../../utils/cloneObj';


interface ITableInfos {
  type: 'places' | 'attacttion' | 'review';
  info: any[];
}

const TableInfos: React.FC<ITableInfos> = ({ type, info }) => {
  interface IDeletePlace {
    place_name: string;
    id: string;
  }

  interface IPlace{
    id: string;
    img_url: string;
    place_name: string;
    place_desc: string;
  }

  const { handleOpenModal } = useModal();

  useEffect(() => {
    setInfo(info);
  }, [info]);

  const [infoTable, setInfo] = useState(info);
  const [confirmDelete, setDeleteConfirm] = useState<IDeletePlace>(
    {} as IDeletePlace
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isEditar, setIsEditar] = useState(false);

  const [placeTobeEdited, setEditPlace] = useState({} as IPlace);

  const handleChangeEditPalce = ( value: string,key:'place_name' | 'place_desc') => {
    const obj:IPlace = cloneObj(placeTobeEdited);
    obj[key] = value;
    setEditPlace(obj);
  };

  const handleEditPlace = async (action:boolean, value?:IPlace) => {

    if(!action && !value){
      setInfo(info);
      setIsEditar(action);
      return;
    }


    if(value && action){

      setInfo([value]);
      setEditPlace(value);

    }else{
      const {id,place_desc,place_name} = placeTobeEdited;

      const dataEditPlace = {place_name, place_desc };

      try {
        setIsLoading(true);
        await api.put(`places/${id}`, dataEditPlace);
        toast.success('Informações Atualizadas com sucesso!');
        const newInfo = info.map((i:IPlace) => {
          if(i.id === id){
            i.place_name = place_name;
            i.place_desc = place_desc;
          }
          return i;
        });
        setInfo(newInfo);
        setIsLoading(false);
      } catch (error) {
        toast.success('Houve um erro no processo');
        console.log(error);
        setIsLoading(false); 
      }

   
    }

    setIsEditar(action);
  };

  const handleDeletePlaces = async (id: string) => {
    setIsLoading(true);

    try {
      await api.delete(`/places/${id}`);
      const newTable = infoTable.filter((p) => p.id !== id);
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
      <InputSearch info={info} handleFilterInfo={setInfo} />

      {isLoading ? (
        <LoaderPage />
      ) : (
        confirmDelete.place_name && (
          <div className={style.confirmDelete}>
            Certeza que deseja excluir <u>{confirmDelete.place_name}?</u>
            <b>Essa ação será permanente</b>
            <button onClick={() => handleDeletePlaces(confirmDelete.id)}>
              Confirmar
            </button>
            <button 
            onClick={() => setDeleteConfirm({} as IDeletePlace)}>
              Cancelar
            </button>
          </div>
        )
      )}

      <table className={style.tableinfo}>
        <thead>
          <tr>
            {headers[type].map((th) => (
              <th key={th}>{th}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {!infoTable.length && (
            <tr>
              <td colSpan={8}> Nada encontrado </td>
            </tr>
          )}
          {infoTable.map((td) => {
            return (
              <tr key={td.id}>
                <td>
                  {isEditar ? (
                    <input type="text" onChange={(e) => {
                      handleChangeEditPalce(e.target.value,'place_name');
                    }} value={placeTobeEdited.place_name} />
                  ) : (
                    td.place_name
                  )}
                </td>
                <td>
                  {isEditar ? (
                    <textarea  onChange={(e) => {
                      handleChangeEditPalce(e.target.value,'place_desc');
                    }} value={placeTobeEdited.place_desc} />
                  ) : (
                    `${td.place_desc.substring(0, 50)} ...`
                  )}
                </td>
                <td style={{ cursor: 'not-allowed' }}>
                  {td.img_url.length ? (
                    <button
                      type="button"
                      onClick={() => handleOpenModal(true, true, td.img_url, td.id )}
                    >
                      <FiCheck color="green" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleOpenModal(true, true, '-', td.id )}
                    >  <FiX color="tomato" /></button>
                  )}
                </td>
                <td>{format(new Date(td.updated_at), 'dd/MM/yyyy')}</td>
                <td>
                  {!isEditar ? (
                    <button onClick={() => handleEditPlace(true, td )}>
                      <FiEdit color="#bb7c08" />
                    </button>
                  ) : (
                   <>
                    <button  
                      className={style.confirmEdit} 
                      onClick={() => handleEditPlace(false, td )} 
                    >
                      <FiCheckCircle color="green" /> Confirmar
                    </button>
                    <button  
                      className={style.goBack} 
                      onClick={() => handleEditPlace(false)} 
                    >
                      <FiArrowLeft color="gray" /> Voltar
                    </button>
                   </>
                  )}
                </td>
                <td>
                  {!isEditar && <button onClick={() => setDeleteConfirm(td)}>
                    <FiTrash color="tomato" />
                  </button>}
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
