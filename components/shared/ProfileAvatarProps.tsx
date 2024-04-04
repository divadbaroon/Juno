import React, { useState } from 'react';
import Cropper, { Area } from 'react-easy-crop';

import { FormDescription, FormLabel } from "@/components/ui/form";

interface ProfileAvatarProps {
  photo: File | null;
  onPhotoChange: (file: File | null) => void;
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ photo, onPhotoChange }): React.ReactElement | null => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);

  const onCropComplete = (_croppedAreaPercentage: any, croppedAreaPixels: Area) => {
    setCroppedArea(croppedAreaPixels);
  };

  const handleSaveCroppedImage = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  
    if (croppedArea && photo) {
      const canvas = document.createElement('canvas');
      const scaleFactor = 1; // Adjust based on your needs
      canvas.width = croppedArea.width * scaleFactor;
      canvas.height = croppedArea.height * scaleFactor;
      const ctx = canvas.getContext('2d');
  
      if (ctx) {
        const image = new Image();
        image.src = URL.createObjectURL(photo);
        await new Promise((resolve) => {
          image.onload = () => {
            ctx.drawImage(
              image,
              croppedArea.x,
              croppedArea.y,
              croppedArea.width,
              croppedArea.height,
              0,
              0,
              canvas.width,
              canvas.height
            );
            resolve(null);
          };
        });
  
        canvas.toBlob((blob) => {
          if (blob) {
            const croppedImageFile = new File([blob], 'cropped-image.png', {
              type: 'image/png',
            });
            onPhotoChange(croppedImageFile); // Now you're passing the File to onPhotoChange
          } else {
            console.error('Blob creation failed.');
          }
        }, 'image/png');
      }
    }
  };
  

  return (
    <>
      <FormLabel className="font-bold" style={{ color: '#636363' }}>
        Profile Avatar (Optional)
      </FormLabel>
      <FormDescription style={{ marginTop: '.2rem' }}>
        Upload a photo to represent your profile.
      </FormDescription>
      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
        {photo ? (
          <div className="relative" style={{ width: '300px', height: '300px' }}>
            <Cropper
              image={URL.createObjectURL(photo)}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              style={{ containerStyle: { width: '100%', height: '100%' } }}
            />
            <div
              className="absolute inset-0"
              style={{
                border: '2px dashed #999',
                width: '300px',
                height: '300px',
                pointerEvents: 'none',
              }}
            />
          </div>
        ) : (
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-300"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                clipRule="evenodd"
              />
            </svg>
            <div className="mt-4 flex text-sm leading-6 text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                <span>Upload a file</span>
                <input
                  id="file-upload"
                  name="profile-photo"
                  type="file"
                  className="sr-only"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      onPhotoChange(e.target.files[0]);
                    }
                  }}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
          </div>
        )}
      </div>
      {photo && (
        <div className="flex justify-end">
          <button
            type="button" // Change this to type="button" to prevent it from submitting a form
            className="mt-4 mr-4 px-4 py-2 bg-indigo-600 text-white rounded"
            onClick={handleSaveCroppedImage}
          >
            Save Cropped Image
          </button>
        </div>
      )}
    </>
  );
};