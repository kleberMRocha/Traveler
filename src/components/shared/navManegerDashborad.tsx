import React, { Dispatch, SetStateAction, useState } from 'react';
import styles from '../../../styles/components/NavManegerDashboard.module.css';
import { FiUpload, FiPlus, FiTool, FiDownload, FiCheck } from 'react-icons/fi';
import { toast } from 'react-toastify';
import api from '../../services/axios';
import LoaderPage from './LoaderPage';

interface INavDashboard {
  pageName: string;
  handleUpade: (value: any) => void; 
}

export const NavManeger: React.FC<INavDashboard> = ({ pageName, handleUpade }) => {
  const [fileName, setFileName] = useState('');
  const [PlaceId, setPlaceID] = useState('');
  const [file, setFile] = useState({} as FileList);
  const [isLoading, setIsloading] = useState(false);

  const handleGetFile = (file: FileList | null) => {
    if (!file) return;
    if(file[0].type !== 'text/csv'){
      toast.warn('Formato do arquivo não é valido');
      return;
    }

    setFile(file);
    setFileName(file[0]?.name);

  };

  const handleConfirmImport = async () => {

    const importPlaces = new FormData();
    importPlaces.append('csv', file[0], file[0]?.name );

    try {
      setIsloading(true);
      const response = await  api.post('dashboard/upload', importPlaces,{
        headers: { "Content-Type": "multipart/form-data" },
      });

      if(pageName === 'places'){
        const responsePlaces = await api.get('http://localhost:4000/places/')
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
        <button>
          <FiPlus />
          Cadastrar
        </button>
        <button>
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
      {
        isLoading 
        ? <LoaderPage /> 
        :  <div className={styles.fileName}>
        {fileName}

        {fileName && (
          <button className={styles.confirm} onClick={() => handleConfirmImport()}>
            <FiCheck /> Confirmar Importação
          </button>
        )}
      </div>

      }
     

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
