import { NativeSelect, SimpleGrid } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { BrandModel } from '../../models/Responses/BrandModel';
import BrandService from '../../services/brandService';


type Props = {}
const AddCar = (props: Props) => {
  const [brands, setBrands] = useState<BrandModel[]>([]);

  useEffect(() => {
    let brandService = new BrandService();
  
    brandService.getAll().then((result) => {
      
    });
  
  }, []);
  const selectData = [
    { label: 'Select an option', value: '' }, // Empty option
    ...brands.map((brand) => ({
      label: brand.carModelEntityBrandEntityName,
      value: brand.id.toString(),
    })),
  ];

  return (
    <div style={{marginTop:100}}>
      <SimpleGrid cols={1} spacing="lg">
          <NativeSelect label="Input label" data={selectData} />
      </SimpleGrid>
    </div>
  )
}

export default AddCar