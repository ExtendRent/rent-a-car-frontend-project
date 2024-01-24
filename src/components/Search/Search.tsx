import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search: React.FC = () => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const navigate = useNavigate();

  const handleSearch = () => {
   
    navigate(`/selectedCar?startDate=${startDate}&endDate=${endDate}`);
    console.log('Arama Tarihi:', startDate);
    console.log('Bitiş Tarihi:', endDate);
  };

  return (
    <div className="container-lg mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8"> {/* col-md-8 kullanarak genişliği artırın */}
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Araç Kirala</h5>
              <div className="mb-3">
                <label htmlFor="startDate" className="form-label">Alış Tarihi</label>
                <input
                  type="date"
                  className="form-control"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="endDate" className="form-label">İade Tarihi</label>
                <input
                  type="date"
                  className="form-control"
                  id="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSearch}
              >
                Ara
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;