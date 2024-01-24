import { NavLink } from '@mantine/core';
import { IconGauge, IconFingerprint } from '@tabler/icons-react';

function AdminPanel() {
  return (
    <div style={{marginTop:100}}>
      <NavLink
        href="#required-for-focus"
        label="Arabalar"
        leftSection={<IconGauge size="1rem" stroke={1.5} />}
        childrenOffset={28}
      >
        <NavLink href="/cars" label="Arabalar" />
        <NavLink href="/addCar" label="Araba Ekleme" />
      </NavLink>

      <NavLink
        href="#required-for-focus"
        label="Markalar"
        leftSection={<IconGauge size="1rem" stroke={1.5} />}
        childrenOffset={28}
      >
        <NavLink href="/brands" label="Markalar" />
        <NavLink href="/addBrand" label="Marka Ekleme" />
      </NavLink>

      <NavLink
        href="#required-for-focus"
        label="Renk"
        leftSection={<IconGauge size="1rem" stroke={1.5} />}
        childrenOffset={28}
      >
        <NavLink href="/colors" label="Renkler" />
        <NavLink href="/uddColor" label="Renk Ekleme" />
      </NavLink>

      <NavLink
        href="#required-for-focus"
        label="İndirim Kuponu"
        leftSection={<IconGauge size="1rem" stroke={1.5} />}
        childrenOffset={28}
      >
        <NavLink href="/discountCodes" label="İndirim Kuponları" />
        <NavLink href="/addDiscountCode" label="İndirim Kuponu Ekleme" />
      </NavLink>

      <NavLink
        href="#required-for-focus"
        label="Araba Modeli"
        leftSection={<IconGauge size="1rem" stroke={1.5} />}
        childrenOffset={28}
      >
        <NavLink href="/carModels" label="Araba Modelleri" />
        <NavLink href="/addCarModel" label="Araba Modelli Ekleme" />
      </NavLink>

      <NavLink
        href="#required-for-focus"
        label="Araba Kasa Tipi"
        leftSection={<IconGauge size="1rem" stroke={1.5} />}
        childrenOffset={28}
      >
        <NavLink href="/carBodyTypes" label="Araba Modelleri" />
        <NavLink href="/addCarBodyType" label="Araba Kasa Tipi Ekleme" />
      </NavLink>

      <NavLink
        href="#required-for-focus"
        label="Admin"
        leftSection={<IconGauge size="1rem" stroke={1.5} />}
        childrenOffset={28}
      >
        <NavLink href="/admins" label="Adminler" />
        <NavLink href="/addAdmin" label="Admin Ekleme" />
      </NavLink>

      <NavLink
        href="#required-for-focus"
        label="Müşteri"
        leftSection={<IconGauge size="1rem" stroke={1.5} />}
        childrenOffset={28}
      >
        <NavLink href="/customers" label="Müşteriler" />
        <NavLink href="/addCustomer" label="Müşteri Ekleme" />
      </NavLink>

      <NavLink
        href="#required-for-focus"
        label="Çalışan"
        leftSection={<IconGauge size="1rem" stroke={1.5} />}
        childrenOffset={28}
      >
        <NavLink href="/employees" label="Çalışanlar" />
        <NavLink href="/addEmployee" label="Çalışan Ekleme" />
      </NavLink>

   
    </div>
  );
}
export default AdminPanel;