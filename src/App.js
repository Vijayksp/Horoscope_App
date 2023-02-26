import React, { useState } from "react";
import "./style.css";
const horoscopeSigns = [
  "aries",
  "taurus",
  "gemini",
  "cancer",
  "leo",
  "virgo",
  "libra",
  "scorpio",
  "sagittarius",
  "capricorn",
  "aquarius",
  "pisces",
]; // array of horoscope signs for dropdown

const App = () => {
  const [horoscopeSign, setHoroscopeSign] = useState(""); // state for horoscope sign dropdown
  const [name, setName] = useState(""); // state for name input
  const [horoscopeDate, setHoroscopeDate] = useState(""); // state for horoscope date dropdown
  const [email, setEmail] = useState(""); // state for email input
  const [horoscope, setHoroscope] = useState([]); // state for form validation errors
  const [formErrors, setFormErrors] = useState({}); // state for form validation errors

  const handleSubmit = (event) => {
    event.preventDefault();
    // validate form fields
    const errors = {};
    if (!horoscopeSign) {
      errors.horoscopeSign = "Please select a horoscope sign";
    }
    if (!name) {
      errors.name = "Please enter your name";
    }
    if (!horoscopeDate) {
      errors.horoscopeDate = "Please select a horoscope date";
    }
    if (!email) {
      errors.email = "Please enter your email";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email";
    }
    // if there are no errors, submit the form
    if (Object.keys(errors).length === 0) {
      // call API to fetch horoscope details
      fetchHorscope(horoscopeDate, horoscopeSign);
    } else {
      setFormErrors(errors);
    }
  };

  const fetchHorscope = (day, sign) => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "ff18ef9720msh63019cbe84e10bdp15ffa4jsn11b28dfa3140",
        "X-RapidAPI-Host": "horoscope-astrology.p.rapidapi.com",
      },
    };

    fetch(
      `https://horoscope-astrology.p.rapidapi.com/horoscope?day=${day}&sunsign=${sign}`,
      options
    )
      .then((response) => response.json())
      .then((response) => setHoroscope(response)) //store response data in horoscope
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div className="content">
        <header>
          <h1>Daily Horoscope</h1>
        </header>

        <form className="form2" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="horoscopeSign">Horoscope sign:</label>
            <select
              id="horoscopeSign"
              value={horoscopeSign}
              onChange={(event) => setHoroscopeSign(event.target.value)}
            >
              <option value="">Select a sign</option>
              {horoscopeSigns.map((sign) => (
                <option key={sign} value={sign}>
                  {sign}
                </option>
              ))}
            </select>
            <br />
            {formErrors.horoscopeSign && (
              <span>{formErrors.horoscopeSign}</span>
            )}
          </div>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              value={name}
              placeholder="Enter your name"
              onChange={(event) => setName(event.target.value)}
            />
            <br /> {formErrors.name && <span>{formErrors.name}</span>}
          </div>
          <div>
            <label htmlFor="horoscopeDate">Horoscope date:</label>
            <select
              id="horoscopeDate"
              value={horoscopeDate}
              onChange={(event) => setHoroscopeDate(event.target.value)}
            >
              <option value="">Select a date</option>
              <option value="today">Today</option>
              <option value="tomorrow">Tomorrow</option>
              <option value="yesterday">Yesterday</option>
            </select>
            <br />
            {formErrors.horoscopeDate && (
              <span>{formErrors.horoscopeDate}</span>
            )}
          </div>
          <div>
            <label className="lab" htmlFor="email">
              Email:
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <br />
            {formErrors.email && <span>{formErrors.email}</span>}
          </div>
          
          <div>
            <button type="submit">Fetch Horoscope</button>
          </div>
        </form>
        
          <div className="res">
            <div>Color:&nbsp;&nbsp;{horoscope?.color}</div>
            <div>Lucky No:&nbsp;&nbsp;{horoscope?.lucky_number}</div>
            <div>Lucky Time:&nbsp;&nbsp;{horoscope?.lucky_time}</div>
            <div>Mood :&nbsp;&nbsp;{horoscope?.mood}</div>
            <div>Sunsign :&nbsp;&nbsp;{horoscope?.sunsign}</div>
            {console.log(horoscope.areas)};
            <div>Horoscope :&nbsp;&nbsp;{horoscope?.horoscope}</div>
            <div>
             
              {horoscope?.areas?.map((option) => (
                <div className="title">
                  Title:{<div> {option.title}</div> }
                 Description: <div> {option.desc}</div>
                </div>
              ))}
            </div>
          </div>
        
      </div>
    </>
  );
};

export default App;
