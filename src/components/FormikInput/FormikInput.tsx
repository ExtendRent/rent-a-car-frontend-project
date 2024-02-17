import React, { useState } from "react";
import { Field } from "formik";

type Props = {
    label: string;
    name: string;
    type?: string;
    placeHolder?: string;
    value?: string | number; // string veya number alabilir
    onChange?: (value: string | number) => void; // string veya number alacak şekilde ayarlandı
};

const FormikInput = (props: Props) => {
    const [error, setError] = useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      let newValue: string | number = event.target.value; // Başlangıçta, değeri doğrudan al
        
      let errorMessage = ''; // Hata mesajını saklamak için bir değişken oluştur
  
      if (props.type === 'number') {
          const parsedValue = parseFloat(event.target.value);
          newValue = isNaN(parsedValue) ? '' : parsedValue; // Eğer dönüşüm başarısız olursa, değeri boş bir string olarak ayarla
      }
  
      // Değer boş ise hata mesajını ayarla
      if (newValue === '') {
          errorMessage = `${props.label}`;
      }
  
      // Hata mesajını set et
      setError(errorMessage);
      
      props.onChange?.(newValue);
  };
  
  

    return (
        <div className="mb-3">
            <label className="form-label">{props.label}</label>
            <Field
                name={props.name}
                type={props.type || "text"}
                className="form-control"
                placeholder={props.placeHolder}
                value={props.value}
                onChange={handleChange} // handleChange fonksiyonu kullanıldı
            />
            {error && (
                <div className="text-danger">{error}</div>
            )}
        </div>
    );
};

export default FormikInput;
