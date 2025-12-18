import { React, StrictMode } from 'react'
import { createRoot, ReactDOM } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Lander from './components/Lander.jsx'
import Achievement from './components/Achievements.jsx'
import ProjectsHome from './components/ProjectsHome.jsx'
import EventsHome from './components/EventsHome.jsx'
import Squads from './components/Squads.jsx'
import Gallery from './components/Gallery.jsx'
import Events from './components/Events.jsx'
import Contacts from './components/Contacts.jsx'

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
      <ProjectsHome/>
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
      <Route path='/Events' element={<Events/>}/>
      <Route path='/Contacts' element={<Contacts/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
