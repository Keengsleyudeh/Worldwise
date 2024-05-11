import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom"

import { CitiesProvider} from "./contexts/CitiesContext"
import { AuthProvider} from "./contexts/FakeAuthContext"
import ProviderRoute from "./pages/ProviderRoute"

import { Suspense, lazy } from "react"

// import HomePage from "./pages/HomePage"
// import Pricing from "./pages/Pricing"
// import Product from './pages/Product'
// import Login from './pages/Login'
// import PageNotFound from "./pages/PageNotFound"
// import AppLayout from "./pages/AppLayout"

import CityList from "./components/CityList"
// import {useState, useEffect} from 'react'
import CountryList from "./components/CountryList"
import City from "./components/City"
import Form from "./components/Form"
import SpinnerFullPage from "./components/SpinnerFullPage"


const HomePage = lazy(()=>import("./pages/HomePage"))
const Product = lazy(()=>import("./pages/Product"))
const Pricing = lazy(()=>import("./pages/Pricing"))
const Login = lazy(()=>import("./pages/Login"))
const AppLayout = lazy(()=>import("./pages/AppLayout"))
const PageNotFound = lazy(()=>import("./pages/PageNotFound"))

// dist/assets/index-c36f33c7.css   29.91 kB │ gzip:   5.06 kB
// dist/assets/index-a0646e2b.js   515.21 kB │ gzip: 148.44 kB







function App() {


  // console.log(cities)

  return (
    <div>
      <CitiesProvider>
        <AuthProvider>
          <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />} >
            <Routes>
              <Route index element={<HomePage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route path="app" element={
                <ProviderRoute>
                <AppLayout />
                </ProviderRoute>
                }>
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path='cities/:id'element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>

          </BrowserRouter>
        </AuthProvider>
      </CitiesProvider>

    </div>
  )
}
export default App
  

