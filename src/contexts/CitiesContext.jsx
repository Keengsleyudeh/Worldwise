import { useEffect } from "react";
import { useState } from "react";
import { createContext, useContext } from "react";

const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext()

function CitiesProvider({children}) {

    const [cities, setCities] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const [currentCity, setCurrentCity] = useState({})
  
    useEffect(function () {
      async function fetchCities() {
        try {
          setIsLoading(true)
          const res = await fetch(`${BASE_URL}/cities`)
          const data = await res.json()
          setCities(data)
          
        }
        catch{
          alert("No data found")
        }
        finally {
          setIsLoading(false)
        }
      }
      fetchCities()
    }, []);

    async function getCity(id) {
            try {
              setIsLoading(true)
              const res = await fetch(`${BASE_URL}/cities/${id}`)
              const data = await res.json()
              setCurrentCity(data)
              
            }
            catch{
              alert("No data found")
            }
            finally {
              setIsLoading(false)
            }
    }

    async function createCity(newCity) {
      try {
        setIsLoading(true)
        const res = await fetch(`${BASE_URL}/cities`, {
          method: "POST",
          body: JSON.stringify[newCity],
          headers: {
            "Content-Type": "application/json",
          },
        })
        const data = await res.json()
        
        console.log(data)
      }
      catch{
        alert("No data found")
      }
      finally {
        setIsLoading(false)
      }
}

    return (
        <CitiesContext.Provider value = {{
            cities,
            isLoading,
            currentCity, 
            getCity,
            createCity
        }}
        >
            {children}
        </CitiesContext.Provider>
    )
}
function useCities() {
    const context = useContext(CitiesContext)
    if (context === undefined) throw new Error ("CitiesContext was used outside of CitiesProvider")
    return context;
}
export {CitiesProvider, useCities}