import React from 'react';
import { useParams } from 'react-router-dom';

const UpdateBrand = () => {
  const { id } = useParams(); // URL'den id parametresini al
  return (
    <div>
      UpdateBrand ID: {id}
    </div>
  );
};

export default UpdateBrand;
