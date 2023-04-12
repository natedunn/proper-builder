// @refresh reload
import { Suspense } from 'solid-js';
import {
  useLocation,
  A,
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from 'solid-start';
import './root.css';

export default function Root() {
  const location = useLocation();
  const active = (path: string) =>
    path == location.pathname ? 'border-sky-600' : 'border-transparent hover:border-sky-600';
  return (
    <Html lang='en'>
      <Head>
        <Title>Proper — Making dependencies easier</Title>
        <Meta charset='utf-8' />
        <Meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin='' />
        <link
          href='https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,300;0,400;0,700;1,400;1,700&display=swap'
          rel='stylesheet'
        />
      </Head>
      <Body class='flex min-h-screen flex-col'>
        <Suspense>
          <ErrorBoundary>
            <Routes>
              <FileRoutes />
            </Routes>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
