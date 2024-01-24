// SelectedCar.tsx
import React, { useEffect, useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import "./SelectedCar.css";
import CarCart from '../../components/CarCart/CarCart';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/configureStore';
import { addShowRental } from '../../store/slices/showRentalSlice';

const SelectedCar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const dispatch =useDispatch<AppDispatch>();
  const showRentalState =useSelector((state: any) => state.showRental);
  console.log(showRentalState);


  const handleCarButtonClick = (carId: string) => {
    setActiveTab("tab2");
    // carId'yi kullanarak istediğiniz işlemleri yapabilirsiniz
    
    console.log(`Selected car with id: ${carId}`);
  };

  const handleRentDetailsButtonClick = () => {
    setActiveTab("tab3");
  };

  const handlePaymentProcessButtonClick = () => {
    setActiveTab("tab4");
  };

  useEffect(() => {
    // Sayfa yüklendiğinde aktif tab'ı güncelle
    setActiveTab("tab1");
  }, []);

  return (
    <Tabs
      activeKey={activeTab || undefined}
      className="custom-tabs"
      onSelect={(key) => setActiveTab(key as string)}
    >
      <Tab eventKey="tab1" title={<div className={activeTab === "tab1" ? "tab-title active-tab" : "tab-title"}>Aracınız</div>}>
        <CarCart onButtonClick={handleCarButtonClick}/>
      </Tab>
      <Tab eventKey="tab2" title={<div className={activeTab === "tab2" ? "tab-title active-tab" : "tab-title "}>Kiralama Detayları</div>} disabled={activeTab !== "tab2"}>
        <div className="tab-content">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleRentDetailsButtonClick}
          >
            Kiralama Detaylarını Görüntüle
          </button>
        </div>
      </Tab>
      <Tab eventKey="tab3" title={<div className={activeTab === "tab3" ? "tab-title active-tab" : "tab-title "}>Ödeme İşlemi</div>} disabled={activeTab !== "tab3"}>
        <div className="tab-content">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handlePaymentProcessButtonClick}
          >
            Ödeme İşlemlerini Görüntüle
          </button>
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
