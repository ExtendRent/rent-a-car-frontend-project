import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/configureStore';
import { deleteDiscountCode, fetchDiscountCodes, updateDiscountCode } from '../../store/slices/discountCodeSlice';

type Props = {}

const DiscountCodes = (props: Props) => {

  const dispatch = useDispatch<AppDispatch>();
  const discountCodeState = useSelector((state: any) => state.discountCode);

  const [selectedDiscount, setSelectedDiscount] = useState<number | null>(null);

  const [discountCode, setDiscountCode] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState<number | undefined>(0);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    dispatch(fetchDiscountCodes())
    console.log(discountCodeState);

  }, [dispatch])

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(typeof e.target.value);

    setSelectedDiscount(parseInt(e.target.value, 10));
  };

  const handleDiscountCodeUpdateSuccess = () => {
    if (discountCode.trim() !== "" && selectedDiscount !== null) {
      dispatch(updateDiscountCode({
        id: selectedDiscount,
        discountCode: discountCode,
        discountPercentage: discountPercentage,
        isActive: isActive,
      }));
      handleCancelUpdate();
    }

  };

  const handleCancelUpdate = () => {
    setSelectedDiscount(null);
    setDiscountCode("");
    setDiscountPercentage(undefined);
    dispatch(fetchDiscountCodes());
  };

  const handleDeleteDiscountCode = async () => {
    if (selectedDiscount !== null) {
      await dispatch(deleteDiscountCode({ discountCodeId: selectedDiscount }));
      handleDiscountCodeUpdateSuccess();
    }
  };


  return (
    <div style={{ marginTop: 200 }}>
      <h2>DiscountCode List</h2>

      <select value={selectedDiscount || ''} onChange={handleSelectChange}>
        <option value="" disabled>
          Select a discountcode
        </option>
        {discountCodeState.discountCodes.map((discountCode: any) => (
          <option key={discountCode.id} value={discountCode.id}>
            {discountCode.discountCode}
          </option>
        ))}
      </select>

      {selectedDiscount !== null && (
        <div>
          <input
            type="text"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
          />


        </div>
      )}

      {selectedDiscount !== null && (
        <div>
          <div>
            <input
              type="text"
              value={discountPercentage}
              onChange={(e) => setDiscountPercentage(parseInt(e.target.value, 10))}
            />


          </div>

          <div>
            <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
          </div>
        </div>
      )}

      <button style={{ marginLeft: 8 }} onClick={handleDiscountCodeUpdateSuccess}>Update</button>
      <button style={{ marginLeft: 8 }} onClick={handleCancelUpdate}>Cancel</button>
      <button onClick={handleDeleteDiscountCode} disabled={selectedDiscount === null}>
        Delete
      </button>
    </div>
  )

}

export default DiscountCodes