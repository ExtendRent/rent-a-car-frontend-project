import React from 'react';
import { useField } from 'formik';
import Select from 'react-select';

interface FormikSelectProps {
  label: string;
  options: { value: any; label: string }[];
  name: string;
}

const FormikSelect: React.FC<FormikSelectProps> = ({ label, options, name }) => {
  const [field, meta, helpers] = useField(name);

  const handleChange = (selectedOption: any) => {
    helpers.setValue(selectedOption ? selectedOption.value : ''); // Tek bir değer seçildiğinde seçilen değeri ayarlar
  };

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      borderColor: state.isFocused ? '#80bdff' : '#ced4da',
      boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(0, 123, 255, 0.25)' : 'none',
      borderRadius: '10px',
      backgroundColor: '#9b9a9a4b',
      color: 'red', 
      '&:hover': {
        borderColor: state.isFocused ? '#80bdff' : '#ced4da',
      },
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: 'gray',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#f0f0f0' : '#9b9a9a4b',
      hoverBackgroundColor: '#e6e6e6',
      color: state.isSelected ? 'black' : 'white',
    }),
    labelStyle: {
      color: 'white',
    },
  };

  return (
    <div>
      <label htmlFor={name} className="label-style">{label}</label>
      <Select
        id={name}
        options={options}
        value={options.find(option => option.value === field.value)} // Seçilen değeri belirtmek için options dizisindeki uygun seçeneği bulur
        onChange={handleChange}
        onBlur={() => helpers.setTouched(true)}
        styles={{
          ...customStyles,
          singleValue: (provided: any) => ({
            ...provided,
            color: 'white', // Seçilen değerin metin rengini beyaz yap
          }),
        }}
        
      />
      {meta.touched && meta.error ? (
        <div className="text-danger">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default FormikSelect;
