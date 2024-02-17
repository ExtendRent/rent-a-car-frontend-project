import React from 'react';
import { useField } from 'formik';
import Select from 'react-select';

interface FormikSelectProps {
  label: string;
  options: { value: any; label: string }[];
  name: string;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const FormikSelect: React.FC<FormikSelectProps> = ({ label, options, name, value, onChange, ...props }) => {
  const [field, meta, helpers] = useField(name);

  const handleChange = (selectedOption: any) => {
    helpers.setValue(selectedOption ? selectedOption.value : '');
  };

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      borderColor: state.isFocused ? '#80bdff' : '#ced4da',
      boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(0, 123, 255, 0.25)' : 'none',
      borderRadius: '10px', // Yuvarlak border
      '&:hover': {
        borderColor: state.isFocused ? '#80bdff' : '#ced4da',
      },
    }),
  };

  /* 
  
  const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    borderColor: state.isFocused ? '#ff4081' : '#ced4da', // Belirgin bir renk seç
    backgroundColor: state.isFocused ? '#ffffff' : '#f5f5f5', // Arka plan rengini değiştir
    borderWidth: '2px', // Kenarlık kalınlığını artır
    borderRadius: '20px', // Kenar yuvarlaklığını artır
    boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(255, 64, 129, 0.25)' : 'none', // Daha canlı bir gölge efekti ekle
    '&:hover': {
      borderColor: state.isFocused ? '#ff4081' : '#ced4da',
    },
  }),
};

  */
  

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Select
        id={name}
        options={options}
        value={options.find(option => option.value === field.value)}
        onChange={handleChange}
        onBlur={() => helpers.setTouched(true)}
        styles={customStyles}
      />
      {meta.touched && meta.error ? (
        <div className="text-danger">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default FormikSelect;
