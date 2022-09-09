import { useEffect } from 'react';
import { fetchCurrenciesList } from './store/currenciesListSlice';
import { useAppDispatch } from './store/hooks';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Convertor from './components/Convertor/Convertor';
import './App.scss';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCurrenciesList());
  }, [dispatch]);

  return (
    <main className="app">
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/convertor" element={<Convertor />} />
        <Route path="*" element={<Navigate to={'/dashboard'} />} />
      </Routes>
    </main>
  );
}

export default App;
