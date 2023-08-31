
import './App.scss';
import Header from './components/Header';
import Container from 'react-bootstrap/Container';

import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';
import { useDispatch } from 'react-redux'
import { handleRefresh } from './redux/actions/userAction'
function App() {
  const dispatch = useDispatch()



  // console.log('user', user)

  useEffect(() => {
    if (localStorage.getItem("token")) {
      // loginContext(localStorage.getItem("email"), localStorage.getItem("token"))
      dispatch(handleRefresh())
    }
  }, [])
  return (
    <>
      <div className='App-container'>
        <Header />
        <Container>
          <AppRoutes />
        </Container>

      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

    </>
  );
}

export default App;
