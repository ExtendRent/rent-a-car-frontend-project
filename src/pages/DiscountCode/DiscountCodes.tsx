import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/configureStore';
import { deleteDiscountCode, fetchDiscountCodes, updateDiscountCode } from '../../store/slices/discountCodeSlice';
import MyMUIDataTable from "./DiscountCodeTable";
import '../Brands/Brand.css';
import SideBar from '../../components/Sidebar/SideBar';

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
    <div >
    <SideBar>
      <div className="full-screen">
        <MyMUIDataTable />
      </div>
    </SideBar>
     
  </div>
  )

}

export default DiscountCodes