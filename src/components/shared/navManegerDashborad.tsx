import React, { useState } from 'react';
import styles from '../../../styles/components/NavManegerDashboard.module.css';
import {
  FiUpload,
  FiPlus,
  FiTool,
  FiDownload,
  FiCheck,
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import api from '../../services/axios';
import LoaderPage from './LoaderPage';

interface INavDashboard {
  pageName: string;
  handleUpade: (value: any) => void;
}

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

  const handleClearFormPlace = () => {
    setPlaceDesc('');
    setPlaceName('');
    setPlaceImg({} as FileList | null);
  };

  const handleCreateNewPlace = async () => {
   
    if((!placeImg?.length)  || !placeName || !placeDesc){
      toast.warn('Por favor, preencha todas as informações necessárias');
      return
    };

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

      if (pageName === 'places') {
        const responsePlaces = await api.get('places');
        handleUpade(responsePlaces.data);
      }

      
      handleClearFormPlace();
      
    } catch (error) {
      toast.error('Houve um erro ao cadastrar o Lugar');
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
        <button onClick={() => {
           const table = document.getElementById('table');
           if(!table) return;
           table.scrollIntoView({behavior:"smooth"});
        }}>
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

      {showForm && (
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
          placeholder="Descrição" />

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
          type="button">Cadastrar</button>
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
