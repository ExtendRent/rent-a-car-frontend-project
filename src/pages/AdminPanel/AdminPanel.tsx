
import React, { useEffect, useState } from 'react';
import './AdminPanel.css';
import CarService from '../../services/carService';
import Cars from '../Cars/Cars';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/configureStore';
import { fetchCars } from '../../store/slices/carSlice';
import { fetchColors } from '../../store/slices/colorSlice';
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
import { fetchPaymentTypes } from '../../store/slices/paymentTypeSlice';
import DrivingLicenseTypes from '../DrivingLicenseType/DrivingLicenseTypes';
import DeleteCar from '../Cars/DeleteCar';
import { Action } from '@remix-run/router';

const AdminPanel: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  interface Entity {
    name: string;
    component: React.FC<any>;
  }
  ///const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>({});
  const [selectedEntity, setSelectedEntity] = useState<{ entity: Entity | null, action: 'add' | 'update' | 'delete' }>({ entity: null, action: 'add' });



  const entities = [
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
  ];


  const handleEntitySelect = (entityName: string, action: 'add' | 'update' | 'delete') => {
    const entity = entities.find(entity => entity.name === entityName);
    if (entity) {
      setSelectedEntity({ entity: entity, action: action });
      setIsFormVisible(false);
    }
  };


  useEffect(() => {
    dispatch(fetchColors());
    dispatch(fetchPaymentTypes());
  }, [dispatch])

   const handleActionButtonClick = (action: 'add' | 'update' | 'delete') => {
    if (action === 'add') {
      setSelectedEntity({ entity: null, action: 'add' });
      setIsFormVisible(true);
    } else if (action === 'update') {
      setSelectedEntity({ entity: null, action: 'update' });
      setIsFormVisible(true);
    } else if (action === 'delete') {
      setSelectedEntity({ entity: null, action: 'delete' });
      setIsFormVisible(true);
    }
  }; 


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="container">
      <div className="row col-md-12">
        <div className="col-md-3">

          <ul className="list-group">
            {entities.map(entity => (
              <li key={entity.name} className="list-group-item" onClick={() => handleEntitySelect(entity.name, 'add')}>
                {entity.name}
              </li>
            ))}
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

        {/*  {selectedPage && pages.map(page => {
            if (page.name === selectedPage) {
              return <page.component key={page.name} />;
            }
          })}
 */}

         {isFormVisible ? (
            <AddCar />
          ) : (
            selectedEntity && selectedEntity.entity && <selectedEntity.entity.component />
          )}
 
         
          {/* {selectedEntity && (
            <selectedEntity.component />
          )} */}
        </div>
      </div>
    </div>
  );


}

export default AdminPanel;
