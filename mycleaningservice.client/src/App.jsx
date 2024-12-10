import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [cities, setcities] = useState();
    const [selectedCity, setSelectedCity] = useState(null);
    const [cityRate, setCityRate] = useState(0);
    const [Services, setServices] = useState([]);
    const [area, setArea] = useState(0);
    const [selectedServices, setSelectedServices] = useState([]);
    const [servicesPrice, setServicesPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isCalculated, setIsCalculated] = useState(false);
    const [isShown, setIsShown] = useState(false);

    useEffect(() => {
        //Getting CityData
        populateCityData();
    }, []);

    //Setting selected city
    const handleCityChange = (event) => {
        //resetting prices 
        setServicesPrice(0);
        setCityRate(0);
        setTotalPrice(0);
        setArea(0);
        setIsCalculated(false);
        setSelectedServices([]); // reset selected services array

        //setting selected city  values
        setSelectedCity(event.target.value);
        handleCityRate(event.target.value);
        handleServices(event.target.value);
    };

    //Setting Price per SquareMeter for city
    const handleCityRate = (c) => {
        cities.map(city => {
            if (city.cityName == c) { setCityRate(city.pricePerSquareMeter) };
        })
    }

    //Setting Area for house
    const handleAreaChange = (event) => {
        setArea(event.target.value);
    };
    //Setting ExtraServices for city
    const handleServices = (c) => {
        cities.map((city) => {
            if (city.cityName == c) {
                setServices(city.extraServices)
            }
        })
        setServicesPrice(0);
    }

    const handleQuote = () => {
        setTotalPrice((cityRate * area) + servicesPrice);
        setIsCalculated(true);
    }
    //Setting SelectedService

    const handleServiceToggle = (service) => {
        const isSelected = selectedServices.includes(service);
        const updatedSelectedServices = isSelected
            ? selectedServices.filter((s) => s !== service)
            : [...selectedServices, service];
        setSelectedServices(updatedSelectedServices);

        // Update total price
        const updateServicesPrice = updatedSelectedServices.reduce((sum, service) => sum + service.servicePrice, 0);
        setServicesPrice(updateServicesPrice); // reset services price
        setTotalPrice(0); //reset total price
        setIsCalculated(false); //reset isCalculated
    };
    
    //Displaying dropdownlist
    const contents = cities === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <div>
            <p>
                <strong>Select City Name: </strong>
           
            {/********* Displaying City List to Select *********/ }
            <select onChange={handleCityChange} value={selectedCity || ""}>
                <option value="">Select a city</option>
                {cities.map(city =>
                    <option key={city.pricePerSquareMeter}>
                        {city.cityName}
                    </option>
                )}
            </select>
            </p>
            {/********* Displaying City Services After City Selection *********/ }
            <div className="city-services">
                <label htmlFor="areaInput" style={{ marginRight: '10px' }}><strong>Enter your House Area: </strong>
                    <input
                        type="number"
                        id="areaInput"
                        value={area}
                        onChange={handleAreaChange}
                        placeholder="SquareMeters"
                />
                </label>
                { /* ######## Displaying Extra Service Available for the City ######### */ }
                <p><strong>Select Extra Services : </strong></p>
                <div>
                    {Services.map((service, i) => (
                        <div key={i}>
                            <label>
                                <input
                                    type="checkbox"
                                    name={`service-${i}`}
                                    value={service.name}
                                    checked={selectedServices.includes(service)}
                                    onChange={() => handleServiceToggle(service)}
                                />
                                {service.name} for {service.servicePrice}Kr
                            </label>
                        </div>
                    ))}
                </div>
                { /* ######## Displaying Total Calculated price for Customer ######### */}
                {isCalculated && < p > <strong>Total Price:</strong>{totalPrice} Kr</p>}
                 {/*// City-service div closed //*/ }
            </div>
        </div>

    // app Return
    return (
        <div>
            <h1 id="appLabel">Cleaning Services</h1>
            {contents}
            <button onClick={handleQuote}>Generate Quote</button>
            <button onClick={() => setIsShown(!isShown)}>
                {isShown ? 'Hide Quote Details' : 'Show Quote Details'}
            </button>
            
            {
                //*********** Displaying Quote Details *********/
                isShown && (
                    <div className="quote-details">
                    <h3>Quote Details:</h3>
                    <p>Price Per Square Meter: {cityRate}Kr</p>
                    <p>Your House Area : {area} km<sup>2</sup></p>
                    <p>Price for your House is {area * cityRate} Kr</p>
                    <p>Price for Extra Services is {servicesPrice} Kr</p>
                    <p>Total Price is {totalPrice} Kr</p>

                </div>)
            }
            
        </div>
    );

    //Fetching City Data
    async function populateCityData() {
        const response = await fetch('city');
        if (response.ok) {
            const data = await response.json();
            setcities(data);
        }


    }
}

export default App;