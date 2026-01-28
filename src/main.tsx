import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { SkeletonTheme } from 'react-loading-skeleton';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { WebsocketProvider } from './hooks/useWebsocket';
import './index.css';

const queryClient = new QueryClient();

async function prepareMSW() {
  if (import.meta.env.MODE === 'development') {
    const { worker } = await import('./mocks/browser');

    await worker.start({
      onUnhandledRequest: 'bypass',
    });
    console.log('MSW 정상적으로 동작중!');
  }
}

prepareMSW().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <WebsocketProvider>
          <BrowserRouter>
            <SkeletonTheme baseColor="#f0f0f0" highlightColor="#e0e0e0" duration={1} enableAnimation={true}>
              <App />
            </SkeletonTheme>
          </BrowserRouter>
        </WebsocketProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </StrictMode>,
  );
});
