import React from 'react'

type Props = {}

const UpdateBrand = (props: Props) => {
  return (
    <div>UpdateBrand</div>
  )
}

export default UpdateBrand

/* import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { updateBrand } from '../../store/slices/brandSlice';
import { AppDispatch } from '../../store/configureStore';

interface UpdateBrandFormProps {
  brandId: number;
  onCancelUpdate: () => void;
  onUpdateSuccess: () => void;
}

const UpdateBrand : React.FC<UpdateBrandFormProps> = (
  { brandId, onCancelUpdate, onUpdateSuccess }
) => {

  const dispatch =useDispatch<AppDispatch>();
  
  const [brandName, setBrandName] = useState('');
  useEffect(() => {
    // Marka adını set et
    // Burada brandId ile marka adını almak için gerekli olan servisi çağırabilirsiniz
  }, [brandId]);

  const handleUpdateBrand = () => {
    if (brandName.trim() !== '') {
      dispatch(updateBrand({ id: brandId, name: brandName })).then(() => {
        // Güncelleme işlemi tamamlandığında tetiklenir
        onUpdateSuccess();
      });
    }
  };
  return (
    <div>
        <input
          type="text"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
        />
        <button onClick={handleUpdateBrand}>Update Brand</button>
        <button onClick={onCancelUpdate}>Cancel</button>
    </div>
  )
}

export default UpdateBrand */