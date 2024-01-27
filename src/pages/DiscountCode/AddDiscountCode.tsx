import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/configureStore';
import { addDiscountCode } from '../../store/slices/discountCodeSlice';

type Props = {}

const AddDiscountCode = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const [discountCode, setDiscountCode] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState<number | null>(null);

  const handleAddDiscountCode = () => {
    // Discount kodu ve percentage boş olmamalı
    const discountCodePattern = /^[a-zA-Z0-9]+$/;
    const percentagePattern = /^[0-9]+$/;
    if (
        discountCode.trim() !== "" &&
        discountCodePattern.test(discountCode) &&  //değişkeninin belirtilen desene uyup uymadığına bak
        discountPercentage !== null && 
        percentagePattern.test(discountPercentage.toString()) && // Sayı olmalı
        discountPercentage >= 5 && 
        discountPercentage <= 90 
    ) {
        dispatch(addDiscountCode({ discountCode: discountCode, discountPercentage: discountPercentage }));
        // State temizlenir
        setDiscountCode("");
        setDiscountPercentage(null);
    }
}; 



  return (
    <div style={{marginTop:200}}>
    <input
      type="text"
      value={discountCode}
      onChange={(e) => setDiscountCode(e.target.value)}
    />
     

     <div style={{marginTop:20}}>
    <input
      type="text"
      value={discountPercentage !== null ? discountPercentage.toString() : ''}
      onChange={(e) => setDiscountPercentage(parseInt(e.target.value, 10))}
    />
    
</div>
<button onClick={handleAddDiscountCode}>Add Discountcode</button> 
  </div>
  

  )
}

export default AddDiscountCode