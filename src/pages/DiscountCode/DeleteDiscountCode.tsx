import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/configureStore';
import { deleteDiscountCode, fetchDiscountCodes } from '../../store/slices/discountCodeSlice';

type Props = {}

const DeleteDiscountCode = (props: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const discountCodeState = useSelector((state: any) => state.discountCode);
    const [selectedDiscountCode, setSelectedDiscountCode] = useState<number | null>(null);
  
    useEffect(() => {
      dispatch(fetchDiscountCodes());
    })
  
    const handleDiscountCodeChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
      const codeId = parseInt(e.target.value, 10);
      setSelectedDiscountCode(codeId);
    }
  
    const handleDeleteDiscountCode = async () => {
      if (selectedDiscountCode !== null) {
        await dispatch(deleteDiscountCode({ discountCodeId: selectedDiscountCode }));
        setSelectedDiscountCode(null);
      }
    }
  
    return (
      <div id='container-discountCode' className="container d-flex flex-column align-items-center">
  
        <div id='select-block' className="col-md-6">
  
          <div className="mb-2">
            <label htmlFor="selectDiscountCode">İndirim Kuponu Seç</label>
            <select className="form-select" id="discountCodeSelect" value={selectedDiscountCode || ''} onChange={handleDiscountCodeChange}>
              <option value="" disabled>
  
              </option>
              {discountCodeState.discountCodes.map((discountCode: any) => (
                <option key={discountCode.id} value={discountCode.id} >
                  {discountCode.discountCode}
                </option>
              ))}
            </select>
          </div>
          <button type="button" className="btn btn-primary" onClick={handleDeleteDiscountCode} disabled={selectedDiscountCode === null}>
            Delete Discount Code
          </button>
        </div>
  
      </div>
    )
}

export default DeleteDiscountCode