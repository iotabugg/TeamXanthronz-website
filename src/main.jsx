import { React, StrictMode } from 'react'
import { createRoot, ReactDOM } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Lander from './components/Lander.jsx'
import Achievement from './components/Achievements.jsx'
import EventsHome from './components/EventsHome.jsx'
import Squads from './components/Squads.jsx'
import Gallery from './components/Gallery.jsx'
import Events from './components/Events.jsx'
import AboutUs from './components/AboutUs.jsx'
import AchievementsPage from './components/AchievementsPage.jsx'
import Evolve from './components/Evolve.jsx'

const Home = () => (
  <>
    <div>
      <video
        className="fixed inset-0 w-full h-full object-cover -z-20"
        src="/videos/215761_medium.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="fixed inset-0 w-full h-full object-cover -z-20"></div>
      <Lander />
      <Achievement/>
      <EventsHome />
    </div>
  </>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path='/Squads' element={<Squads/>}/>
      <Route path='/Gallery' element={<Gallery/>}/>
      <Route path='/evolve' element={<Evolve/>}/>
      <Route path='/Events' element={<Events/>}/>
      <Route path='/about' element={<AboutUs/>}/>
      <Route path='/achievements' element={<AchievementsPage/>}/>

    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
