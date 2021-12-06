import React from 'react';
import styles from '../../../styles/components/NavManegerDashboard.module.css';
import {FiUpload,FiPlus,FiTool, FiDownload} from 'react-icons/fi';

export const NavManeger:React.FC = () => {
  return (
    <div>
      <nav className={styles.actions}>
        <button><FiPlus />Cadastrar</button>
        <button><FiTool/>Gerenciar</button>
        <button><FiUpload />Importar / Exportar</button>
      </nav>
      <div className={styles.downloadModelo}>
          <button>
               Download Modelo de Importação <FiDownload />
          </button>
      </div>
    </div>
  );
};
