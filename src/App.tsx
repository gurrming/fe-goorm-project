import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ModalProvider } from './components/common/Modal/ModalProvider';
import Layout from './components/layout/Layout';

const MainPage = lazy(() => import('./pages/MainPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const AssetPage = lazy(() => import('./pages/AssetPage'));
const AiAnalysisPage = lazy(() => import('./pages/AiAnalysisPage'));

function App() {
  return (
    <ModalProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/asset" element={<AssetPage />} />
          <Route path="/ai-analysis" element={<AiAnalysisPage />} />
        </Route>
      </Routes>  
    </ModalProvider>
  );
}

export default App;
