import React, { useEffect, useState } from 'react';
import style from '../../../styles/components/Table.module.css';
import {
  FiCheck,
  FiX,
  FiEdit,
  FiTrash,
  FiCheckCircle,
  FiArrowLeft,
} from 'react-icons/fi';
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
  setInfoProp: (info:any[]) => void;
}

const TableInfos: React.FC<ITableInfos> = ({ type, info, setInfoProp }) => {
  interface IDelete {
    attraction_name?: string;
    place_name?: string;
    id: string;
  }

  interface IPlace {
    id: string;
    img_url: string;
    place_name: string;
    place_desc: string;
  }

  interface IAttractions {
    id: string;
    img_url: string;
    attraction_name: string;
    attraction_desc: string;
    place: {
      id: string;
      place_name: string;
    };
    attraction_type: string;
    location: string;
  }

  const { handleOpenModal } = useModal();
  const [comboplacesEdit, setComboPlaces] = useState([]);

  useEffect(() => {
    setInfo(info);
  }, [info]);

  const [infoTable, setInfo] = useState(info);
  const [confirmDelete, setDeleteConfirm] = useState<IDelete>({} as IDelete);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditar, setIsEditar] = useState(false);

  const [placeTobeEdited, setEditPlace] = useState({} as IPlace);
  const [attTobeEdited, setEditAtt] = useState({} as IAttractions);

  useEffect(() => {
    api.get('places').then((res) => {
      const combo = res.data.map((p: { id: string; place_name: string }) => {
        return { key: p.id, value: p.place_name };
      });

      setComboPlaces(combo);
    });
  }, [attTobeEdited]);

  const handleChangeEditPalce = (
    value: string,
    key: 'place_name' | 'place_desc'
  ) => {
    const obj: IPlace = cloneObj(placeTobeEdited);
    obj[key] = value;
    setEditPlace(obj);
  };

  const handleChangeAttractions = (
    value: string,
    key:
      | 'attraction_name'
      | 'attraction_desc'
      | 'place'
      | 'attraction_type'
      | 'location'
  ) => {
    const obj: IAttractions = cloneObj(attTobeEdited);
    if (key === 'place') {
      const infos = JSON.parse(value);

      obj.place.place_name = infos.name;
      obj.place.id = infos.key;
      setEditAtt(obj);
      return;
    }
    obj[key] = value;
    setEditAtt(obj);
  };

  const handleEdit = async (action: boolean, value?: IPlace | IAttractions) => {
    if (!action && !value) {
      setInfo(info);
      setIsEditar(action);
      return;
    }

    if (value && action) {
      setInfo([value]);
      type === 'places'
        ? setEditPlace(value as IPlace)
        : setEditAtt(value as IAttractions);
    } else {
      const { id, place_desc, place_name } = placeTobeEdited;
      const dataEditPlace = { place_name, place_desc };

      const {
        id: idAtt,
        attraction_desc,
        attraction_name,
        attraction_type,
        location,
        place,
      } = attTobeEdited;
      const dataEditAtt = {
        attraction_desc,
        attraction_name,
        attraction_type,
        location,
        place: place.id,
      };

      try {
        setIsLoading(true);
        await type === 'places' 
        ? api.put(`places/${id}`, dataEditPlace)
        : api.put(`attractions/${idAtt}`, dataEditAtt)

        toast.success('Informações Atualizadas com sucesso!');

        const newInfo  = type === 'places' 
        ?  info.map((i: IPlace) => {
          if (i.id === id) {
            i.place_name = place_name;
            i.place_desc = place_desc;
          }
          return i;
        })
        : info.map((i: IAttractions) => {
          if (i.id === idAtt) {
            i.attraction_name = attraction_name;
            i.attraction_desc = attraction_desc;
            i.attraction_type = attraction_type;
            i.location = location;
            i.place = place;
          }
          return i;
        });

        setInfoProp(newInfo);
        setIsLoading(false);
      } catch (error) {
        toast.success('Houve um erro no processo');
        console.log(error);
        setIsLoading(false);
      }
    }

    setIsEditar(action);
  };

  const handleDelete = async (id: string) => {
    setIsLoading(true);

    try {
      (await type) === 'attacttion'
        ? api.delete(`/attractions/${id}`)
        : api.delete(`/places/${id}`);

      const newTable = infoTable.filter((p) => p.id !== id);
      setInfoProp(newTable);
      toast.success('Lugar excluido com sucesso');
      setDeleteConfirm({} as IDelete);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error('Houve um erro ao tentar exlcuir');
      setIsLoading(false);
    }
  };

  const getTipoEvento = (value: number): string => {
    const typesAtt = [
      'Alimentação',
      'Shows',
      'Exposição',
      'Trilhas',
      'Baladas / Festas',
    ];

    return typesAtt[value];
  };

  const headers = {
    places: [
      'ID',
      'Lugar',
      'Resumo',
      'Imagem',
      'Ultima Atualização',
      'Editar',
      'Deletar',
    ],
    attacttion: [
      'Evento',
      'Lugar',
      'Resumo',
      'Imagem',
      'Tipo',
      'Endereço',
      'Ultima Atualização',
      'Editar',
      'Deletar',
    ],
    review: [],
  };

  if (type === 'attacttion') {
    return (
      <>
        <InputSearch info={info} handleFilterInfo={setInfo} />

        {isLoading ? (
          <LoaderPage />
        ) : (
          confirmDelete.id && (
            <div className={style.confirmDelete}>
              Certeza que deseja excluir{' '}
              <u>
                {confirmDelete.place_name || confirmDelete.attraction_name}?
              </u>
              <b>Essa ação será permanente</b>
              <button onClick={() => handleDelete(confirmDelete.id)}>
                Confirmar
              </button>
              <button onClick={() => setDeleteConfirm({} as IDelete)}>
                Cancelar
              </button>
            </div>
          )
        )}

        <table className={style.tableinfo}>
          <thead>
            <tr>
              {headers[type].map((th) => (
                <th
                  className={style.attHeader}
                  key={th}
                  style={{
                    display:
                      isEditar && (th === 'Deletar' || th === 'Imagem')
                        ? 'none'
                        : '',
                  }}
                >
                  {th}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {!infoTable.length && (
              <tr>
                <td colSpan={9}> Nada encontrado </td>
              </tr>
            )}
            {infoTable.map((td) => {
              return (
                <tr key={td.id}>
                  <td>
                    {isEditar ? (
                      <input
                        type="text"
                        onChange={(e) => {
                          handleChangeAttractions(
                            e.target.value,
                            'attraction_name'
                          );
                        }}
                        value={attTobeEdited.attraction_name}
                      />
                    ) : (
                      td.attraction_name
                    )}
                  </td>
                  <td>
                    {isEditar ? (
                      <select
                        style={{ width: '100px' }}
                        onChange={(e) => {
                          handleChangeAttractions(e.target.value, 'place');
                        }}
                        defaultValue={attTobeEdited.place.place_name}
                      >
                        {comboplacesEdit.map(
                          (p: { key: string; value: string }, index) => {
                            return (
                              <option key={`${p.key}_${index}`} value={JSON.stringify({key: p.key, name: p.value})}>
                                {p.value}
                              </option>
                            );
                          }
                        )}
                      </select>
                    ) : (
                      td.place.place_name
                    )}
                  </td>
                  <td>
                    {isEditar ? (
                      <textarea
                        onChange={(e) => {
                          handleChangeAttractions(
                            e.target.value,
                            'attraction_desc'
                          );
                        }}
                        value={attTobeEdited.attraction_desc}
                      />
                    ) : (
                      `${td.attraction_desc.substring(0, 50)} ...`
                    )}
                  </td>
                  <td
                    style={{
                      cursor: 'not-allowed',
                      display: isEditar ? 'none' : '',
                    }}
                  >
                    {td.img_url.length ? (
                      <button
                        type="button"
                        onClick={() =>
                          handleOpenModal(true, true, td.img_url, td.id)
                        }
                      >
                        <FiCheck color="green" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleOpenModal(true, true, '-', td.id)}
                      >
                        {' '}
                        <FiX color="tomato" />
                      </button>
                    )}
                  </td>
                  {!isEditar ? (
                    <td className={style.attColumns}>
                      {getTipoEvento(td.attraction_type)}
                    </td>
                  ) : (
                    <td className={style.attColumns}>
                      <select
                        disabled={isLoading}
                        onChange={(e) =>
                          handleChangeAttractions(
                            e.target.value,
                            'attraction_type'
                          )
                        }
                        defaultValue={td.attraction_type}
                        id="tipoEvento"
                        placeholder="Tipo de Evento"
                      >
                        <option value="0">Alimentação</option>
                        <option value="1">Shows</option>
                        <option value="2">Exposição</option>
                        <option value="3">Trilhas</option>
                        <option value="4">Baladas / Festas</option>
                      </select>
                    </td>
                  )}

                  {!isEditar ? (
                    <td className={style.attColumns}>{td.location}</td>
                  ) : (
                    <td className={style.attColumns}>
                      <input
                        style={{ width: '150px' }}
                        type="text"
                        onChange={(e) => {
                          handleChangeAttractions(e.target.value, 'location');
                        }}
                        value={attTobeEdited.location}
                      />
                    </td>
                  )}

                  <td className={style.attColumns}>
                    {format(new Date(td.updated_at), 'dd/MM/yyyy')}
                  </td>
                  <td>
                    {!isEditar ? (
                      <button onClick={() => handleEdit(true, td)}>
                        <FiEdit color="#bb7c08" />
                      </button>
                    ) : (
                      <>
                        <button
                          className={style.confirmEdit}
                          onClick={() => handleEdit(false, td)}
                        >
                          <FiCheckCircle color="green" /> Confirmar
                        </button>
                        <button
                          className={style.goBack}
                          onClick={() => handleEdit(false)}
                        >
                          <FiArrowLeft color="gray" /> Voltar
                        </button>
                      </>
                    )}
                  </td>
                  <td style={{ display: isEditar ? 'none' : '' }}>
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
  }

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
            <button onClick={() => handleDelete(confirmDelete.id)}>
              Confirmar
            </button>
            <button onClick={() => setDeleteConfirm({} as IDelete)}>
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
                    <button style={{fontSize: '10px'}} onClick={() => {
                      navigator.clipboard.writeText(td.id);
                      toast.info('ID copiado para área de transferência')
                    }}>
                       { td.id }
                    </button>
                </td>
                <td>
                  {isEditar ? (
                    <input
                      type="text"
                      onChange={(e) => {
                        handleChangeEditPalce(e.target.value, 'place_name');
                      }}
                      value={placeTobeEdited.place_name}
                    />
                  ) : (
                    td.place_name
                  )}
                </td>
                <td>
                  {isEditar ? (
                    <textarea
                      onChange={(e) => {
                        handleChangeEditPalce(e.target.value, 'place_desc');
                      }}
                      value={placeTobeEdited.place_desc}
                    />
                  ) : (
                    `${td.place_desc.substring(0, 50)} ...`
                  )}
                </td>
                <td style={{ cursor: 'not-allowed' }}>
                  {td.img_url.length ? (
                    <button
                      type="button"
                      onClick={() =>
                        handleOpenModal(true, true, td.img_url, td.id)
                      }
                    >
                      <FiCheck color="green" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleOpenModal(true, true, '-', td.id)}
                    >
                      {' '}
                      <FiX color="tomato" />
                    </button>
                  )}
                </td>
                <td>{format(new Date(td.updated_at), 'dd/MM/yyyy')}</td>
                <td>
                  {!isEditar ? (
                    <button onClick={() => handleEdit(true, td)}>
                      <FiEdit color="#bb7c08" />
                    </button>
                  ) : (
                    <>
                      <button
                        className={style.confirmEdit}
                        onClick={() => handleEdit(false, td)}
                      >
                        <FiCheckCircle color="green" /> Confirmar
                      </button>
                      <button
                        className={style.goBack}
                        onClick={() => handleEdit(false)}
                      >
                        <FiArrowLeft color="gray" /> Voltar
                      </button>
                    </>
                  )}
                </td>
                <td>
                  {!isEditar && (
                    <button onClick={() => setDeleteConfirm(td)}>
                      <FiTrash color="tomato" />
                    </button>
                  )}
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
