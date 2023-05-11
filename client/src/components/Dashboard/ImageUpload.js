import React, { useState } from 'react';
import UtilsService from '../../UtilsService';

const ImageUpload = (props) => {
  const [image, setImage] = useState(null);
  const [UploadMassage, setUploadMassage] = useState("");

  const utilsService = new UtilsService();

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]); 
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.onerror = (error) => {
        console.error('Error occurred while reading file:', error);
      };
    } 
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (image) {
      try {
          await utilsService.updateCustomerImage(`http://localhost:3001/api/customers/${props.customerId}`, {image: image}).then((res) => {
          if (res.status === 200) {
            setUploadMassage("Upload successfully");
            props.setImageUploaded(true);
          } else {
            setUploadMassage("Error with uploading customer image");
          } 
        }); 
      } catch (error) {
        setUploadMassage("Error with uploading customer image");
      } 
    } else {
        setUploadMassage("Error with uploading customer image");
    }
  };

  return (
    <div>
        <form onSubmit={handleSubmit} className='flex flex-row-reverse mt-12'>
            <input type="file" onChange={handleImageChange} className='w-64 ml-1'/>
            <button type="submit" className='border border bg-sky-900 border-gray-300 w-48'>Upload</button>
        </form>
        <div className='text-right'>{UploadMassage}</div>
    </div>
  );
}

export default ImageUpload;