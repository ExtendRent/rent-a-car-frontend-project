import React, { useState } from "react";
import Cards from "react-credit-cards-2";
import { Focused } from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";

import "./CreditCardForm.css";

interface CreditCardChangeHandler {
  (creditCardInfo: any): void;
}

const CreditCardForm = ({
  onCreditCardChange,
}: {
  onCreditCardChange: CreditCardChangeHandler;
}) => {
  const [state, setState] = useState({
    cardNumber: "",
    cardOwnerName: "",
    cardOwnerSurname: "",
    expirationDate: "",
    cvc: "",
    focus: "",
  });

  const [expirationMonth, setExpirationMonth] = useState("");
  const [expirationYear, setExpirationYear] = useState("");

  const monthOptions = [
    { value: "01", label: "Ocak" },
    { value: "02", label: "Şubat" },
    { value: "03", label: "Mart" },
    { value: "04", label: "Nisan" },
    { value: "05", label: "Mayıs" },
    { value: "06", label: "Haziran" },
    { value: "07", label: "Temmuz" },
    { value: "08", label: "Ağustos" },
    { value: "09", label: "Eylül" },
    { value: "10", label: "Ekim" },
    { value: "11", label: "Kasım" },
    { value: "12", label: "Aralık" },
  ];

  // Yıl seçimi için dinamik bir seçenek listesi oluşturun
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i);
  const yearOptions = years.map((year) => ({
    value: year.toString(),
    label: year.toString(),
  }));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "cardNumber") {
      const formattedValue = value.replace(/\D/g, "");
      const updatedValue = formattedValue.slice(0, 16);
      let formattedCardNumber = "";
      for (let i = 0; i < updatedValue.length; i++) {
        if (i > 0 && i % 4 === 0) {
          formattedCardNumber += " ";
        }
        formattedCardNumber += updatedValue[i];
      }
      setState((prevState) => ({
        ...prevState,
        [name]: formattedCardNumber,
      }));
      onCreditCardChange({ ...state, [name]: formattedCardNumber });
    } else if (name === "cvc" && /^\d{0,3}$/.test(value)) {
      if (/^\d*$/.test(value)) {
        // Sadece rakam içeriyorsa
        setState((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        onCreditCardChange({ ...state, [name]: value });
      }
    } else {
      setState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      onCreditCardChange({ ...state, [name]: value });
    }
  };

  const handleInputFocus = (
    e: React.FocusEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setState((prev) => ({ ...prev, focus: e.target.name }));
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMonth = e.target.value;
    setExpirationMonth(selectedMonth);
    const formattedExpirationDate = `${expirationYear}-${selectedMonth}-01`;
    setState((prevState) => ({
      ...prevState,
      expirationDate: formattedExpirationDate,
    }));
    onCreditCardChange({ ...state, expirationDate: formattedExpirationDate });
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = e.target.value;
    setExpirationYear(selectedYear);
    const formattedExpirationDate = `${selectedYear}-${expirationMonth}-01`;
    setState((prevState) => ({
      ...prevState,
      expirationDate: formattedExpirationDate,
    }));
    onCreditCardChange({ ...state, expirationDate: formattedExpirationDate });
  };

  return (
    <div>
      <Cards
        name={`${state.cardOwnerName} ${state.cardOwnerSurname}`}
        number={state.cardNumber}
        expiry={state.expirationDate}
        cvc={state.cvc}
        focused={state.focus as Focused}
      />
      <div className="mt-3">
        <form>
          <div className="row">
            <div className="col-12 mb-3" style={{display: "contents"}}>
            <div className="col-6 mb-3">
                <div className="mb-3">
                  <input
                    type="text"
                    name="cardNumber"
                    className="card-control"
                    placeholder="Kart Numarası"
                    value={state.cardNumber}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    name="cardOwnerName"
                    className="card-control"
                    placeholder="Adınız"
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    name="cardOwnerSurname"
                    className="card-control"
                    placeholder="Soyadız"
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    required
                  />
                </div>
            </div>
              <div className="col-6 mb-3">
                <div className="col-6 mb-3">
                  <select
                    name="expirationMonth"
                    className="card-control"
                    value={expirationMonth}
                    onChange={handleMonthChange}
                    onFocus={handleInputFocus}
                    required
                  >
                    <option value="">Ay</option>
                    {monthOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-6 mb-3">
                  <select
                    name="expirationYear"
                    className="card-control"
                    value={expirationYear}
                    onChange={handleYearChange}
                    onFocus={handleInputFocus}
                    required
                  >
                    <option value="">Yıl</option>
                    {yearOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-6 mb-3">
                  <input
                    type="text"
                    name="cvc"
                    className="card-control"
                    placeholder="CVC"
                    maxLength={3} // Maksimum uzunluk 3 olacak
                    onKeyPress={(e) => {
                      // Sadece rakamları kabul et
                      const onlyDigits = /[0-9]/;
                      const key = String.fromCharCode(e.which);
                      if (!onlyDigits.test(key)) {
                        e.preventDefault();
                      }
                    }}
                    value={state.cvc}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    required
                  />
                </div>
                </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreditCardForm;
