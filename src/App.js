import { useAuthContext } from './Context/AuthContext';
import './App.scss';
import "bootstrap/dist/js/bootstrap.bundle";
import ScreenLoader from './components/ScreenLoader';
import Routes from "./Pages/Routes"
import { ConfigProvider } from 'antd';
import Loader from './components/Loader';


function App() {
  const {isAppLoading}=useAuthContext()
  if(isAppLoading)return<Loader/>
  return (
    <>
    <ConfigProvider theme={{ token: { colorPrimary: '#131118',borderRadius:2 } }}>
   {
     !isAppLoading?
     <Routes/>   
     :
     <ScreenLoader/>
   }
  </ConfigProvider>
    </>
  );
}

export default App;
