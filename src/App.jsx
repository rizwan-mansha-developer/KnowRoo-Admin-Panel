// // App.js
// import React, { useEffect } from 'react';
// import { BrowserRouter as Router, useLocation } from 'react-router-dom';

// import { Provider } from 'react-redux';
// import store from './redux/store';
// import AppRoutes from './routes/AppRoutes';

// import { ThemeProvider } from '@mui/material/styles';

// import theme from './theme';

// const App = () => {
//   const ScrollToTop = () => {
//     const { pathname } = useLocation();

//     useEffect(() => {
//       window.scrollTo({
//         top: 0,
//         behavior: 'smooth',
//       });
//     }, [pathname]);

//     return null;
//   };

//   return (
//     <Provider store={store}>
//       <ThemeProvider theme={theme}>
//         <Router>
//           <ScrollToTop />
//           <AppRoutes />
//         </Router>
//       </ThemeProvider>
//     </Provider>
//   );
// };

// export default App;

// App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './redux/store';

import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './conainers/Authentication/AuthContext';

const App = () => {
  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  };

  return (
    <AuthProvider>
    <Provider store={store}>
      {/* <ThemeProvider theme={theme}> */}
      <Router>
        <ScrollToTop />
        <AppRoutes />
      </Router>
      {/* </ThemeProvider> */}
    </Provider>
    </AuthProvider>
  );
};

export default App;
