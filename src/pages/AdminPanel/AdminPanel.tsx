import React, { useEffect, useState } from 'react';
import './AdminPanel.css';
import Cars from '../Cars/Cars';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/configureStore';
import Colors from '../Color/Colors';
import Brands from '../Brands/Brands';
import CarModels from '../CarModel/CarModels';
import CarBodyTypes from '../CarBodyType/CarBodyTypes';
import ShiftTypes from '../ShiftType/ShiftTypes';
import FuelTypes from '../FuelType/FuelTypes';
import DiscountCodes from '../DiscountCode/DiscountCodes';
import VehicleStatuses from '../VehicleStatus/VehicleStatuses';
import Admins from '../Admin/Admins';
import Customers from '../Customer/Customers';
import Employees from '../Employee/Employees';
import AddColor from '../Color/AddColor';
import AddCar from '../Cars/AddCar';
import PaymentTypes from '../PaymentType/PaymentTypes';
import DrivingLicenseTypes from '../DrivingLicenseType/DrivingLicenseTypes';
import DeleteCar from '../Cars/DeleteCar';
import AddCarModel from '../CarModel/AddCarModel';
import AddBrand from '../Brands/AddBrand';
import AddCarBodyType from '../CarBodyType/AddCarBodyType';
import DeleteBrand from '../Brands/DeleteBrand';
import DeleteCarBodyType from '../CarBodyType/DeleteCarBodyType';
import DeleteCarModel from '../CarModel/DeleteCarModel';
import DeleteColor from '../Color/DeleteColor';
import DeleteDiscountCode from '../DiscountCode/DeleteDiscountCode';
import AddDiscountCode from '../DiscountCode/AddDiscountCode';
import AddDrivingLicenseType from '../DrivingLicenseType/AddDrivingLicenseType';
import DeleteDrivingLicenseType from '../DrivingLicenseType/DeleteDrivingLicenseType';
import AddFuelType from '../FuelType/AddFuelType';

interface Entity {
  name: string;
  component: React.FC<any>;
}

const AdminPanel: React.FC = () => {

  const dispatch = useDispatch<AppDispatch>();

  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [selectedAction, setSelectedAction] = useState<string>('');

  const entities: Entity[] = [
    { name: 'Araç', component: Cars },
    { name: 'Marka', component: Brands },
    { name: 'Araç Model', component: CarModels },
    { name: 'Kasa Tipi', component: CarBodyTypes },
    { name: 'Renk', component: Colors },
    { name: 'Vites Tipi', component: ShiftTypes },
    { name: 'Yakıt Tipi', component: FuelTypes },
    { name: 'İndirim Kuponu', component: DiscountCodes },
    { name: 'Araç Durumu', component: VehicleStatuses },
    { name: 'Admin', component: Admins },
    { name: 'Müşteri', component: Customers },
    { name: 'Çalışan', component: Employees },
    { name: 'Ödeme Tipi', component: PaymentTypes },
    { name: 'Ehliyet Tipi', component: DrivingLicenseTypes },
    { name: 'Araba Ekle', component: AddCar },
    { name: 'Araba Güncelle', component: Cars },
    { name: 'Araba Sil', component: DeleteCar },
    { name: 'Marka Ekle', component: AddBrand },
    { name: 'Marka Güncelle', component: Brands },
    { name: 'Marka Sil', component: DeleteBrand },
    { name: 'Model Ekle', component: AddCarModel },
    { name: 'Model Güncelle', component: CarModels },
    { name: 'Model Sil', component: DeleteCarModel },
    { name: 'Kasa Tipi Ekle', component: AddCarBodyType },
    { name: 'Kasa Tipi Güncelle', component: CarBodyTypes },
    { name: 'Kasa Tipi Sil', component: DeleteCarBodyType },
    { name: 'Renk Ekle', component: AddColor },
    { name: 'Renk Güncelle', component: Colors },
    { name: 'Renk Sil', component: DeleteColor },
    { name: 'İndirim Kodu Ekle', component: AddDiscountCode },
    { name: 'İndirim Kodu Güncelle', component: DiscountCodes },
    { name: 'İndirim Kodu Sil', component: DeleteDiscountCode },
    { name: 'Ehliyet Tipi Ekle', component: AddDrivingLicenseType },
    { name: 'Ehliyet Tipi Güncelle', component: DrivingLicenseTypes },
    { name: 'Ehliyet Tipi Sil', component: DeleteDrivingLicenseType },
    { name: 'Yakıt Tipi Ekle', component: AddFuelType },
    { name: 'Yakıt Tipi Güncelle', component: FuelTypes },
    /* { name: 'Yakıt Tipi Sil', component: DeleteFuelType }, */
  ];


  const handleEntitySelect = (entity: Entity) => {
    setSelectedEntity(entity);
  };


  const handleActionButtonClick = (action: string) => {
    setSelectedAction(action);
  };

  const EntityOperationComponent: React.FC<{ entityType: string }> = ({ entityType }) => {
    switch (selectedAction) {
      case 'add':
        return <AddOperationComponent entityType={entityType} />;
      case 'update':
        return <UpdateOperationComponent entityType={entityType} />;
      case 'delete':
        return <DeleteOperationComponent entityType={entityType} />;
      default:
        return null;
    }
  };

  const AddOperationComponent: React.FC<{ entityType: string }> = ({ entityType }) => {
    switch (entityType) {
      case 'Araç':
        return <AddCar />;
      case 'Marka':
        return <AddBrand />;
      case 'Araç Model':
        return <AddCarModel />;
      case 'Kasa Tipi':
        return <AddCarBodyType />;
      case 'Renk':
        return <AddColor />;
      case 'İndirim Kodu':
        return <AddDiscountCode />;
      case 'Ehliyet Tipi':
        return <AddDrivingLicenseType />;
      case 'Yakıt Tipi':
        return <AddFuelType />;
      default:
        return null;
    }
  };

  const UpdateOperationComponent: React.FC<{ entityType: string }> = ({ entityType }) => {
    switch (entityType) {
      case 'Araç':
        return <Cars />;
      case 'Marka':
        return <Brands />;
      case 'Araç Model':
        return <CarModels />;
      case 'Kasa Tipi':
        return <CarBodyTypes />;
      case 'Renk':
        return <Colors />;
      case 'İndirim Kodu':
        return <DiscountCodes />;
      case 'Ehliyet Tipi':
        return <DrivingLicenseTypes />;
      case 'Yakıt Tipi':
        return <FuelTypes />;
      default:
        return null;
    }
  };

  const DeleteOperationComponent: React.FC<{ entityType: string }> = ({ entityType }) => {
    switch (entityType) {
      case 'Araç':
        return <DeleteCar />;
      case 'Marka':
        return <DeleteBrand />;
      case 'Model':
        return <DeleteCarModel />;
      case 'Kasa Tipi':
        return <DeleteCarBodyType />;
      case 'Renk':
        return <DeleteColor />;
      case 'İndirim Kodu':
        return <DeleteDiscountCode />;
      case 'Ehliyet Tipi':
        return <DeleteDrivingLicenseType />;
      default:
        return null;
    }
  };


  return (
    <div className="container">
      <div className="row col-md-12">
        <div className="col-md-3">

          <ul className="list-group">
            {entities.map(entity => {
              // Eğer öğenin adı "Ekle", "Sil" veya "Güncelle" kelimelerini içeriyorsa, gizle
              if (entity.name.includes('Ekle') || entity.name.includes('Sil') || entity.name.includes('Güncelle')) {
                return null;
              }
              return (
                <li key={entity.name} className="list-group-item" onClick={() => handleEntitySelect(entity)}>
                  {entity.name}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="col-md-9">
          <div className="row">
            <div className="col-md-12">
              <div className="btn-group">

                <button className="btn btn-warning" onClick={() => handleActionButtonClick('add')}>Add</button>
                <button className="btn btn-primary" onClick={() => handleActionButtonClick('update')}>Update</button>
                <button className="btn btn-danger" onClick={() => handleActionButtonClick('delete')}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="selected-component">
        <EntityOperationComponent entityType={selectedEntity?.name || ''} />
      </div>
    </div>
  );
}

export default AdminPanel;
