import React, { useEffect, useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import "./SelectedCar.css";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/configureStore';
import { addShowRental } from '../../store/slices/showRentalSlice';
import { useLocation } from 'react-router';
import ShowRental from '../../components/ShowRental/ShowRental';
import moment from 'moment';
import useToken from '../../utils/useToken';
import { AddShowRentalResponse } from '../../models/Responses/AddShowRentalResponse';
import { GetByDateCarResponse } from '../../models/Responses/GetByDateCarResponse';
import CarCart from '../../components/CarCart/CarCart';
import { AllGetByDateCarResponse } from '../../models/Responses/AllGetByDateCarResponse';
import Payment from '../../components/Payment/Payment';

const SelectedCar:React.FC<{ response: AllGetByDateCarResponse | undefined }> = ({ response }) => {
  const brandState = useSelector((state: any) => state.brand.brands);
  const { token, decodedToken, updateToken, clearToken } = useToken();
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const showRentalState = useSelector((state: any) => state.showRental);
  const [rentalResponse, setRentalResponse] = useState<AddShowRentalResponse | undefined>();
  const location = useLocation();
  const startDateString = location?.state?.startDate || '';
  const endDateString = location?.state?.endDate || '';


  const [customerEntityId, setCustomerEntityId] = useState<number | undefined>(undefined);
  const [carEntityId, setCarEntityId] = useState<number | undefined>(undefined);

  
  
  const startDate = moment(startDateString).format('YYYY-MM-DD');
  const endDate = moment(endDateString).format('YYYY-MM-DD');

  

  const handleCarButtonClick = async (discountCode: string, carEntityId: number, startDate: Date | string, endDate: Date | string, customerEntityId?: number) => {
    const startDateValue = startDate instanceof Date ? startDate.toISOString().split('T')[0] : startDate;
    const endDateValue = endDate instanceof Date ? endDate.toISOString().split('T')[0] : endDate;
  
    setActiveTab("tab2");
    if (customerEntityId !== undefined && typeof customerEntityId === 'number') {
      try {
        const response = await dispatch(addShowRental({
          discountCode,
          carEntityId,
          startDate: startDateValue,
          endDate: endDateValue,
          customerEntityId
        }));
        
        if (response.payload) {
         
          
          setRentalResponse(response.payload as AddShowRentalResponse);
        }
        else {
          console.error('Error adding show rental: Response payload is undefined');
        }
      } catch (error) {
        // Hata yönetimi burada
        console.error('Error adding show rental:', error);
      }
    }
  };

  const handleRentDetailsButtonClick = () => {
    setActiveTab("tab3");
  };

  const handlePaymentProcessButtonClick = () => {
    setActiveTab("tab4");
  };

  useEffect(() => {
    setActiveTab("tab1");
  }, []);

  
  return (
    <Tabs
      activeKey={activeTab || undefined}
      className="custom-tabs"
      onSelect={(key) => setActiveTab(key as string)}
    >
      <Tab eventKey="tab1" title={<div className={activeTab === "tab1" ? "tab-title active-tab" : "tab-title"}>Aracınız</div>}>
      
      <CarCart 
          onButtonClick={(carEntityId) => {
          const formattedStartDate = new Date(`${startDate}T00:00:00.000Z`).toISOString().split('T')[0];
          const formattedEndDate = new Date(`${endDate}T00:00:00.000Z`).toISOString().split('T')[0];

          handleCarButtonClick("", carEntityId, formattedStartDate, formattedEndDate, decodedToken?.id);
        }} 
      />

       {/*  <CarCart searchCarResponse={response}/> */}
       
      </Tab>
      <Tab eventKey="tab2" title={<div className={activeTab === "tab2" ? "tab-title active-tab" : "tab-title "}>Kiralama Detayları</div>} disabled={activeTab !== "tab2"}>
        <div className="tab-content">
          
        <ShowRental key={JSON.stringify(rentalResponse)} response={rentalResponse} onPaymentProcessClick={handleRentDetailsButtonClick} />
        </div>
      </Tab>
      <Tab eventKey="tab3" title={<div className={activeTab === "tab3" ? "tab-title active-tab" : "tab-title "}>Ödeme İşlemi</div>} disabled={activeTab !== "tab3"}>
        <div className="tab-content">
            <Payment response={rentalResponse} onPaymentProcessClick={handlePaymentProcessButtonClick}
            startDate={startDate}
            endDate={endDate}/>
        </div>
      </Tab>
      <Tab eventKey="tab4" title={<div className={activeTab === "tab4" ? "tab-title active-tab" : "tab-title"}>Ödeme Bilgileri</div>} disabled={activeTab !== "tab4"}>
        <div className="tab-content">
          Ödeme Bilgilerini Görüntüle
        </div>
      </Tab>
    </Tabs>
  );
};

export default SelectedCar;
