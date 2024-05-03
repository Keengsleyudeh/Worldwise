// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect } from "react";
import { useState } from "react";
import { useUrlPosition } from "../hooks/useUrlPosition";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

import Button from "./Button";
import ButtonBack from "./ButtonBack"

import styles from "./Form.module.css";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCities } from "../contexts/CitiesContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client"

const {createCity} = useCities();

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeolocation, setIsLoadingGeolocation] = useState(false)
  const [emoji, setEmoji] = useState("")
  const [geoCodingError, setGeoCodingError] =useState("")

  const {lat, lng} = useUrlPosition();

  useEffect(function() {
    if (!lat && !lng) return;
    async function fetchCityData() {
      try {
        setIsLoadingGeolocation(true)
        setGeoCodingError("")
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`)
        const data = await res.json()
        console.log(data)

        if (!data.countryCode) throw new Error ("That doesnt seem to be a city. Click somewhere else")

        setCityName(data.city || data.locality || "")
        setCountry(data.country)
        setEmoji(convertToEmoji(data.countryCode))
      }
      catch (err) {
        setGeoCodingError(err.message)
      }
      finally {
        setIsLoadingGeolocation(false)
      }
    }
    fetchCityData()
  }, [lat, lng])

  function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {lat, lng},
    };

    createCity(newCity);
  }

  if (isLoadingGeolocation) return <Spinner />
  if (!lat && !lng) return <Message message={"Click somewhere in the map"} />
  if (geoCodingError) return <Message message={geoCodingError} />

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        
        <DatePicker 
        onChange={(date)=>setDate(date)}
        selected={date}
        dateformat="dd/MM/yyyy"
        id="date"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <ButtonBack />
      </div>
    </form>
  );
}

export default Form;
