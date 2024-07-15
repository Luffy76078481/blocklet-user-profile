import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { px2remTransformer, StyleProvider } from '@ant-design/cssinjs';
import Profile from './pages/profile';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

const px2rem = px2remTransformer({
  rootValue: 16,
});

export default function WrappedApp() {
  // While the blocklet is deploy to a sub path, this will be work properly.
  const basename = window?.blocklet?.prefix || '/';

  return (
    <StyleProvider transformers={[px2rem]}>
      <Router basename={basename}>
        <App />
      </Router>
    </StyleProvider>
  );
}
