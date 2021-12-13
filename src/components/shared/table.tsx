import React, { useEffect, useState } from 'react';
import style from '../../../styles/components/Table.module.css';
import { FiCheck, FiX, FiEdit,  FiTrash } from 'react-icons/fi';
import { format } from 'date-fns';
import InputSearch from './InputSearch';

interface ITableInfos {
  type: 'places' | 'attacttion' | 'review';
  info: any[];
}

const TableInfos: React.FC<ITableInfos> = ({ type, info }) => {

  useEffect(() => {
    setInfo(info);
  },[info]);

  const [infoTable,setInfo] = useState(info);

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
                  <button>
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
