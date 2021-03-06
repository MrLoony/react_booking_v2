import {Routes, Route} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../consts';
import MainScreen from '../MainScreen/MainScreen';
import LoginScreen from '../LoginScreen/LoginScreen';
import PropertyScreen from '../PropertyScreen/PropertyScreen';
import NotFoundScreen from '../NotFoundScreen/NotFoundScreen';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {useEffect} from 'react';
import { fetchOffersAction, checkAuthStatusAction } from '../../store/apiActions';
import FavoritesScreen from '../FavoritesScreen/FavoritesScreen';
import {getAuthorizationStatus} from '../../store/userData/selector';
import {ToastContainer} from 'react-toastify';
import {getLoadedDataStatus} from '../../store/appData/selector';

function App(): JSX.Element {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOffersAction());
  }, [dispatch]);

  useEffect(() => {
    dispatch(checkAuthStatusAction());
  }, [dispatch]);

  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const isDataLoaded = useAppSelector(getLoadedDataStatus);

  if ((authorizationStatus === AuthorizationStatus.Unknown) || !isDataLoaded) {
    return (
      <LoadingScreen/>
    );
  }

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path={AppRoute.Root}
          element={<MainScreen/>}
        >
        </Route>
        <Route path={AppRoute.Login}
          element={<LoginScreen />}
        >
        </Route>
        <Route path={AppRoute.Property}
          element={<PropertyScreen/>}
        >
        </Route>
        <Route path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <FavoritesScreen/>
            </PrivateRoute>
          }
        >
        </Route>
        <Route path='*' element={<NotFoundScreen/>}/>
      </Routes>
    </>
  );
}

export default App;
