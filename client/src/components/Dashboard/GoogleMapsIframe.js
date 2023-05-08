import React, { useState, useRef } from 'react';
import GoogleMapReact from 'google-map-react';
import 'react-datepicker/dist/react-datepicker.css';
import '../../App.css';

const GoogleMapsIframe = () => {
 // const landmark = { lat: 32.143492, lng: 34.841541 };
  const [center, setCenter] = useState({ lat: 32.143492, lng: 34.841541 });
  const [zoom, setZoom] = useState(12);
  const [search, setSearch] = useState('');
  const mapRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [clickedAddress, setClickedAddress] = useState('');
  //const markers = [{ lat: landmark.lat, lng: landmark.lng }];

  const handleSearch = () => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: search, language: 'he' }, (results, status) => {
      if (status === 'OK') {
        const { lat, lng } = results[0].geometry.location;
        setCenter({ lat: lat(), lng: lng() });
        setZoom(15);
        const { map } = mapRef.current;
        map.setCenter({ lat: lat(), lng: lng() });
        map.setZoom(15);
      }
    });
  };

  const handleMapClick = (event) => {
    const { lat, lng } = event;
    setCenter({ lat, lng });
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat: event.lat, lng: event.lng }, language: 'he' }, (results, status) => {
      if (status === 'OK') {
        setClickedAddress(results[0].formatted_address);
      }
    });
  };


  const Marker = (lat, lng) => {
    return (
      <div>
        <img style={{
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
          top: `${lat}%`,
          left: `${lng}%`,
          width: '35px',
          height: '35px',
          borderRadius: '50%',
          backgroundColor: 'red',
          border: '2px solid white',
          zIndex: 1000
        }} src="https://e7.pngegg.com/pngimages/363/769/png-clipart-location-icon-landmark-map-thumbnail.png" alt="mapPoint"></img>
      </div>
    );
  };

  return (
    <div>
    <h1 className='mb-4 text-4xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white'>יצירת בידוד קבוצתי חדש</h1>
    <div style={{ height: '500px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: '' }}
        defaultCenter={center}
        defaultZoom={zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map }) => {
          mapRef.current = { map };
        }}
        onClick={handleMapClick}
      >
      <Marker lat={center.lat} lng={center.lng} />
      </GoogleMapReact>
      <div className='flex mt-4'>
        <button onClick={handleSearch} className="mr-1">חיפוש</button>
        <input type="text" placeholder={clickedAddress || "חפש לפי כתובת"} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div>
        <div className='flex flex-row-reverse mt-6 '>
            <label htmlFor="date-input" className='text-lg'>:בחר תאריך חשיפה לנגיף</label>
            <input
                className='w-6/12 mr-2'
                id="date-input"
                type="date"
                value={selectedDate}
                onChange={e => setSelectedDate(e.target.value)}
            />
       </div>
       <div className='mt-4 text-left'>
        <button onClick={handleSearch} className="mr-1">צור בידוד</button>
      </div>
        {/* <div>
           <DatePicker selected={selectedDate} onChange={date => setSelectedDate(date)} />
        </div> */}
      </div>
    </div>
    </div>
  );
};

export default GoogleMapsIframe;