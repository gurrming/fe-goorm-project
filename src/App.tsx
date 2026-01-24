import { Routes, Route } from 'react-router-dom';
import { ModalProvider } from './components/common/Modal/ModalProvider';
import Layout from './components/layout/Layout';
import AssetPage from './pages/AssetPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import SignupPage from './pages/SignupPage';

function App() {

  return (
    <ModalProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/asset" element={<AssetPage />} />
        </Route>
      </Routes>
    </ModalProvider>
  );
}

export default App;
