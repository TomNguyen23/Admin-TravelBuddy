import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { getNamePlaceHolder } from '@/assets/js/formatter';

const PhotoUpload = ({ photo, setPhoto, fullName }) => {
   const [image, setImage] = useState(photo);

   const handleImageChange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
         setImage(reader.result);
         setPhoto(reader.result);
      }
      reader.readAsDataURL(file);
   }

   return (
      <div className="flex flex-col items-center justify-center space-y-6 p-4">
         <div className="w-48 h-48 bg-gray-100 rounded-lg overflow-hidden shadow-md">
            {image ? (
               <img src={image} alt="Preview" className="w-full h-full object-cover" />
            ) : (
               <div className="flex items-center justify-center h-full text-gray-400 text-7xl">
                  {getNamePlaceHolder(fullName)}
               </div>
            )}
         </div>
         <label className="cursor-pointer bg-blue-600 text-white px-5 py-2 rounded-lg shadow-lg hover:bg-blue-700 text-lg">
            <FontAwesomeIcon icon={faUpload} size='lg' className='pr-2 cursor-pointer' style={{ width: '1rem' }} />
            <span>Tải ảnh lên</span>
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
         </label>
      </div>
   )
}

export default PhotoUpload;