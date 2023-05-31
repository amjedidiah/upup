import React, { useEffect, useState } from 'react';
import useLoadOdAPI from '../hooks/useLoadOdAPI';

interface Params {
  oneDriveClientId: string;
  setKey: (key: string) => void;
  toBeCompressed: boolean;
  canUpload?: boolean;
}

const OneDrive = ({ oneDriveClientId }: Params) => {
  const [files, setFiles] = useState<File[]>([]);

  const { isLoaded } = useLoadOdAPI();

  useEffect(() => {
    console.log('files', files);
  }, [files]);

  const saveFiles = (files: any) => {
    const filesArray: any[] = [];
    Promise.all(
      files.map(async (file: any) => {
        const response = await fetch(file['@microsoft.graph.downloadUrl']);
        const blob = await response.blob();
        const newFile = new File([blob], file.name, {
          type: file.file.mimeType,
        });
        filesArray.push(newFile);
      })
    ).then(() => {
      setFiles(filesArray);
    });
  };

  const openPicker = () => {
    const odOptions = {
      clientId: oneDriveClientId,
      action: 'download',
      multiSelect: true,
      openInNewWindow: true,
      advanced: {
        //     redirectUri: 'http://localhost:3000',
        filter: '.jpg,.png,.pdf,.docx,.xlsx,.pptx',
        queryParameters: 'select=id,name,size,file,folder',
        //     scopes: 'files.readwrite.all',
      },
      success: (response: any) => {
        saveFiles(response.value);
      },
      cancel: () => {
        console.log('User cancelled');
      },
      error: (e: any) => {
        console.log(e);
      },
    };
    const OneDrive = (window as any).OneDrive;
    OneDrive.open(odOptions);
  };

  return (
    <div>{isLoaded && <button onClick={openPicker}>One Drive</button>}</div>
  );
};

export default OneDrive;
