import React, { useState } from 'react';
import croix from '../../../../public/assets/icon/croix.svg'

interface ModalImgProps {
  className: string;
  toggleImg: () => void;
  userId: string | null;
  onSuccess: (newImageFilename: string) => void;
}

function ModalImg({ className, toggleImg, userId, onSuccess }: ModalImgProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) { // 5MB en octets
        setError('Attention la taille de votre fichier excède 5MB');
        setFile(null);
      } else {
        setError(null);
        setFile(selectedFile);
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file || !userId) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(`/api/images/users/${userId}`, {
        method: 'PATCH',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Image uploaded successfully');
        onSuccess(data.filename);
        toggleImg();
      } else {
        const errorText = await response.text();
        console.error('Error uploading image:', errorText);
      }
    } catch (error) {
      console.error('Error uploading image', error);
    }
  };

  return (
    <div className={className}>
      <img src={croix} alt="Close" className='close' onClick={toggleImg} />
      <form onSubmit={handleSubmit}>
        <label htmlFor="avatar">Upload image:</label>
        <input
          type="file"
          id="avatar"
          name="avatar"
          accept="image/png, image/jpeg"
          onChange={handleFileChange}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Save image</button>
      </form>
    </div>
  );
}

export default ModalImg;
