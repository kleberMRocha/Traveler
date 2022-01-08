import React, { useEffect, useRef, useState } from 'react';
import styles from '../../../styles/components/NavManegerDashboard.module.css';
import { FiUpload, FiPlus, FiTool, FiDownload, FiCheck } from 'react-icons/fi';
import { toast } from 'react-toastify';
import api from '../../services/axios';
import LoaderPage from './LoaderPage';

interface INavDashboard {
  pageName: string;
  handleUpade: (value: any) => void;
}

type ILocalList = {id: string, place: string };

export const NavManeger: React.FC<INavDashboard> = ({
  pageName,
  handleUpade,
}) => {
  // update

  const [fileName, setFileName] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [PlaceId, setPlaceID] = useState('');
  const [file, setFile] = useState({} as FileList);
  const [isLoading, setIsloading] = useState(false);

  // place Form

  const [placeImg, setPlaceImg] = useState({} as FileList | null);
  const [placeName, setPlaceName] = useState('');
  const [placeDesc, setPlaceDesc] = useState('');

  // attraction Form
  const [typeAtt, setTypeAttraction] = useState(0);
  const [attName, setAttName] = useState('');
  const [attDesc, setAttDesc] = useState('');
  const [local, setLocal] = useState('');
  const [localList, setLocalList] = useState([] as ILocalList[]);
  const [address, setAddress] = useState('');
  const [attImg,setAttImg] = useState({} as FileList | null);
  const imgAttInput = useRef<HTMLInputElement>(null);


  useEffect(() => {

    api.get('places/')
    .then((res) => {
      const localListArray = res.data.map((l: {id: string, place_name :string }) => {
        return {
          id: l.id,
          place: l.place_name
        }
      });

      setLocalList(localListArray)
    });
    
  },[]);

  const handleClearFormPlace = () => {
    setPlaceDesc('');
    setPlaceName('');
    setPlaceImg({} as FileList | null);
    setTypeAttraction(0);
    setAttName('');
    setAttDesc('');
    setLocal('');
    setAddress('');
    setAttImg({} as FileList | null);
    if( imgAttInput.current){
      imgAttInput.current.value = '';
    }
  };

  const handleCreateNewPlace = async () => {
    if (!placeImg?.length || !placeName || !placeDesc) {
      toast.warn('Por favor, preencha todas as informações necessárias');
      return;
    }

    const createPlace = new FormData();

    createPlace.append('img', placeImg[0], placeImg[0]?.name);
    createPlace.append('place_name', placeName);
    createPlace.append('place_desc', placeDesc);

    try {
      setIsloading(true);
      await api.post('places', createPlace, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Lugar cadastrado com sucesso !');
      setIsloading(false);

  
      const responsePlaces = await api.get('places');
      handleUpade(responsePlaces.data);
      

      handleClearFormPlace();
    } catch (error) {
      toast.error('Houve um erro ao cadastrar o Lugar');
      console.log(error);
      setIsloading(false);
    }
  };

  const handleCreateNewAttraction = async () => {
    if (!attImg?.length || !attName || !attDesc || !String(typeAtt) || !address ||  !local) {
      toast.warn('Por favor, preencha todas as informações necessárias');
      return;
    }

    const createAttraction = new FormData();

    createAttraction.append('img', attImg[0], attImg[0]?.name);
    createAttraction.append('attraction_name', attName);
    createAttraction.append('attraction_desc', attDesc);
    createAttraction.append('attraction_type', String(typeAtt));
    createAttraction.append('place', local);
    createAttraction.append('location', address);

    try {
      setIsloading(true);
      await api.post('attractions', createAttraction, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const response = await api.get('attractions');
      handleUpade(response.data);

      toast.success('Evento cadastrado com sucesso !');
      setIsloading(false);

      handleClearFormPlace();
    } catch (error) {
      toast.error('Houve um erro ao cadastrar o Evento');
      console.log(error);
      setIsloading(false);
    }
    
  };

  // update Places

  const handleGetFile = (file: FileList | null) => {
    setShowForm(false);
    if (!file) return;
    if (file[0] && file[0].type !== 'text/csv') {
      toast.warn('Formato do arquivo não é valido');
      return;
    }

    setFile(file);
    setFileName(file[0]?.name);
  };

  const handleConfirmImport = async () => {
    const importPlaces = new FormData();
    importPlaces.append('csv', file[0], file[0]?.name);

    try {
      setIsloading(true);
      const response = await api.post('dashboard/upload', importPlaces, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (pageName === 'places') {
        const responsePlaces = await api.get('places');
        handleUpade(responsePlaces.data);
      }

      toast.info(response.data.message);
      setIsloading(false);
      setFileName('');
      setFile({} as FileList);
    } catch (error) {
      console.log(error);
      toast.error('Houve um erro na importação');
      setIsloading(false);
    }
  };


  return (
    <div>
      <nav className={styles.actions}>
        <button onClick={() => setShowForm(!showForm)}>
          <FiPlus />
          Cadastrar
        </button>
        <button
          onClick={() => {
            const table = document.getElementById('table');
            if (!table) return;
            table.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <FiTool />
          Gerenciar
        </button>
        <button>
          <label htmlFor="import">
            <FiUpload /> Importar
            <input
              type="file"
              accept=".csv"
              onChange={(e) => handleGetFile(e.target.files)}
              id="import"
              name="import"
              style={{ display: 'none' }}
            />
          </label>
        </button>
      </nav>

      {pageName === 'attractions'
        ? showForm && (
            <form className={styles.formCreate}>
              <label htmlFor="attName">Nome</label>
              <input
                disabled={isLoading}
                onChange={(e) => setAttName(e.target.value)}
                value={attName}
                type="text"
                id="attName"
                placeholder="Nome do Evento"
              />

              <label htmlFor="endereco">Endereço</label>
              <input
                disabled={isLoading}
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                type="text"
                id="endereco"
                placeholder="Endereço do evento"
              />

              <label htmlFor="local">Local</label>
           
              <select
                defaultValue={local}
                disabled={isLoading}
                onChange={(e) => setLocal((e.target.value))}
                id="local"
                placeholder="Nome do Lugar"
              >
                <option value="">Selecione ...</option>
                  {
                    localList.map(l => <option key={l.id} value={l.id}>{l.place}</option> )
                  }
                </select>  
              

              <label htmlFor="tipoEvento">Tipo de Evento</label>
              <select
                disabled={isLoading}
                onChange={(e) => setTypeAttraction(Number(e.target.value))}
                defaultValue={typeAtt}
                id="tipoEvento"
                placeholder="Tipo de Evento"
              >
                <option value="0">Alimentação</option>
                <option value="1">Shows</option>
                <option value="2">Exposição</option>
                <option value="3">Trilhas</option>
                <option value="4">Baladas / Festas</option>
                </select>  

              <label htmlFor="descAtt"> Resumo </label>
              <textarea
                disabled={isLoading}
                id="descAtt"
                onChange={(e) => setAttDesc(e.target.value)}
                value={attDesc}
                placeholder="Descrição"
              />

              <label htmlFor="imgAtt"> Imagem Evento </label>
              <input
                ref={imgAttInput}
                disabled={isLoading}
                type="file"
                id="imgAtt"
                accept="image/png, image/jpeg"
                placeholder="imagem"
                onChange={(e) => setAttImg(e.target.files)}
              />
              <button
                disabled={isLoading}
                onClick={() => handleCreateNewAttraction()}
                type="button"
              >
                Cadastrar
              </button>
            </form>
          )
        : showForm && (
            <form className={styles.formCreate}>
              <label htmlFor="nomePlace">Nome</label>
              <input
                disabled={isLoading}
                onChange={(e) => setPlaceName(e.target.value)}
                value={placeName}
                type="text"
                id="nomePlace"
                placeholder="Nome do Lugar"
              />

              <label htmlFor="descPlace"> Resumo </label>
              <textarea
                disabled={isLoading}
                id="descPlace"
                onChange={(e) => setPlaceDesc(e.target.value)}
                value={placeDesc}
                placeholder="Descrição"
              />

              <label htmlFor="imgPlace"> Imagem Lugar </label>
              <input
                disabled={isLoading}
                type="file"
                id="imgPlace"
                accept="image/png, image/jpeg"
                placeholder="imagem"
                onChange={(e) => setPlaceImg(e.target.files)}
              />
              <button
                disabled={isLoading}
                onClick={() => handleCreateNewPlace()}
                type="button"
              >
                Cadastrar
              </button>
            </form>
          )}
      {isLoading ? (
        <LoaderPage />
      ) : (
        <div className={styles.fileName}>
          {fileName}

          {fileName && (
            <button
              className={styles.confirm}
              onClick={() => handleConfirmImport()}
            >
              <FiCheck /> Confirmar Importação
            </button>
          )}
        </div>
      )}

      <div
        className={styles.downloadModelo}
        style={{ display: pageName === 'review' ? 'none' : 'block' }}
      >
        <a
          href={`/import/${
            pageName === 'places' ? 'PLACES.csv' : 'ATTRACTIONS.csv'
          }`}
          download
        >
          <p>
            <FiDownload /> Download Modelo de Importação
          </p>
          <p>Por favor, não altere a ordem das colunas.</p>
        </a>
      </div>
    </div>
  );
};
