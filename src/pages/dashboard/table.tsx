import React from 'react';
import style from '../../../styles/components/Table.module.css';
import { FiCheck, FiX, FiEdit, FiDelete, FiTrash } from 'react-icons/fi';
import { format } from 'date-fns';

interface ITableInfos {
  type: 'places' | 'attacttion' | 'review';
  info: any[];
}

const TableInfos: React.FC<ITableInfos> = ({ type, info }) => {
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
    <table className={style.tableinfo}>
      <thead>
        <tr>
          {headers[type].map((th) => (
            <th key={th}>{th}</th>
          ))}
        </tr>
      </thead>
      <tbody>
          {!info.length && <tr> <td colSpan={8}> Nada encontrado </td></tr>}
        {info.map((td) => {
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
                <td>{format(new Date(td.updated_at), 'dd-MM-yyyy')}</td>
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
  );
};

export default TableInfos;
