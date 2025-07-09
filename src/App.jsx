// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import SearchPage from './pages/SearchPage';
import CharacterList from './pages/CharacterList';
import SpeciesList from './pages/SpeciesList';
import CivilizationList from './pages/CivilizationList';
import WeaponList from './pages/WeaponList';
import EquipmentList from './pages/EquipmentList';
import WorldList from './pages/WorldList';

import AddCharacter from './pages/AddCharacter';
import EditCharacter from './pages/EditCharacter';
import AddWeapon from './pages/AddWeapon';
import EditWeapon from './pages/EditWeapon';
import AddEquipment from './pages/AddEquipment';
import EditEquipment from './pages/EditEquipment';
import AddSpecies from './pages/AddSpecies';
import EditSpecies from './pages/EditSpecies';
import AddCivilization from './pages/AddCivilization';
import EditCivilization from './pages/EditCivilization';
import AddWorld from './pages/AddWorld';
import EditWorld from './pages/EditWorld';

import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import { AuthProvider } from './Context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<SearchPage />} />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/characters"
                element={
                  <ProtectedRoute>
                    <CharacterList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/species"
                element={
                  <ProtectedRoute>
                    <SpeciesList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/civilizations"
                element={
                  <ProtectedRoute>
                    <CivilizationList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/weapons"
                element={
                  <ProtectedRoute>
                    <WeaponList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/equipment"
                element={
                  <ProtectedRoute>
                    <EquipmentList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/worlds"
                element={
                  <ProtectedRoute>
                    <WorldList />
                  </ProtectedRoute>
                }
              />

              {/* Admin Only Add/Edit Routes */}
              <Route
                path="/characters/add"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <AddCharacter />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/characters/edit/:id"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <EditCharacter />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/species/add"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <AddSpecies />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/species/edit/:id"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <EditSpecies />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/civilizations/add"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <AddCivilization />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/civilizations/edit/:id"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <EditCivilization />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/weapons/add"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <AddWeapon />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/weapons/edit/:id"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <EditWeapon />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/equipment/add"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <AddEquipment />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/equipment/edit/:id"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <EditEquipment />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/worlds/add"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <AddWorld />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/worlds/edit/:id"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <EditWorld />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
