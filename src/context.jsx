import React, { useContext, useEffect, useState } from 'react'

const AppContext = React.createContext();
import axios from 'axios'

const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php'


const AppProvider = ({ children }) => {
const [loading, setLoading] = useState(false)
const [meals, setMeals] = useState([])
const [searchTerm, setSearchTerm] = useState('')

  const fetchMeals = async(url) =>{
    setLoading(true)
      try {
        const {data} = await axios(url)
  
        setMeals(data.meals)

        if (data.meals) {
          setMeals(data.meals)
        }
        else {
          setMeals([])
        }
      } catch (error) {
          console.log(error.response)
      }
     setLoading(false)
    } 
  
const fetchRandomMeal = () => {
    fetchMeals(randomMealUrl)
  }

  
  useEffect(()=>{

    fetchMeals(`${allMealsUrl}${searchTerm}`)
  },[searchTerm])

  return <AppContext.Provider value={{loading, meals, setSearchTerm, fetchRandomMeal }}>
  { children }
  </AppContext.Provider>
}

export const useGlobalContext = ()  =>{
  return useContext(AppContext)
}

export { AppContext, AppProvider }