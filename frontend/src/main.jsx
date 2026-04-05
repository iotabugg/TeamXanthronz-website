import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import Layout from './Layout.jsx'
import Lander from './components/Lander.jsx'
import Achievements from './components/Achievements.jsx'
import EventsHome from './components/EventsHome.jsx'
import Squads from './components/Squads.jsx'
import Gallery from './components/Gallery.jsx'
import Events from './components/Events.jsx'
import AboutUs from './components/AboutUs.jsx'
import AchievementsPage from './components/AchievementsPage.jsx'
import Evolve from './components/Evolve.jsx'
import NotFound from './components/NotFound.jsx'

const Home = () => (
  <div className="relative">
    {/* Background video - full visibility */}
    <video
      className="fixed inset-0 w-full h-full object-cover -z-20"
      src="/videos/215761_medium.mp4"
      autoPlay
      muted
      loop
      playsInline
    />
    {/* Subtle dark tint - keeps text readable while video shows through */}
    <div className="fixed inset-0 -z-10 bg-[#040d06]/50" />
    <Lander />
    <Achievements />
    <EventsHome />
  </div>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<Home />} />
      <Route path='squads' element={<Squads />} />
      <Route path='gallery' element={<Gallery />} />
      <Route path='evolve' element={<Evolve />} />
      <Route path='events' element={<Events />} />
      <Route path='about' element={<AboutUs />} />
      <Route path='achievements' element={<AchievementsPage />} />
      <Route path='*' element={<NotFound />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)