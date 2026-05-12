"use client";

import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '@/utils/cropImage';

export default function ImageCropper({ onImageCropped, onCancel, onUploadStart, aspectRatio }) {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl);
    }
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      if (onUploadStart) onUploadStart();
      const croppedImageBlob = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        0
      );
      
      const formData = new FormData();
      formData.append("file", croppedImageBlob, "cropped.jpg");
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      
      if(data.url) {
        onImageCropped(data.url);
      } else {
        alert("Upload failed");
      }
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels, onImageCropped, onUploadStart]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '400px', background: '#333' }}>
      {!imageSrc ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: 'column' }}>
          <input type="file" accept="image/*" onChange={onFileChange} style={{color: 'white'}} />
          <button onClick={onCancel} style={{marginTop: '20px'}}>Cancel</button>
        </div>
      ) : (
        <>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: '60px' }}>
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={aspectRatio || 1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
          <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '10px' }}>
            <button onClick={onCancel} style={{ padding: '8px 16px', background: 'gray', color: 'white', border: 'none', borderRadius: '4px' }}>Cancel</button>
            <button onClick={showCroppedImage} style={{ padding: '8px 16px', background: 'blue', color: 'white', border: 'none', borderRadius: '4px' }}>Upload Cropped Image</button>
          </div>
        </>
      )}
    </div>
  );
}

function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}
