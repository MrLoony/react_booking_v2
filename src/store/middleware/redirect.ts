import {rootReducer} from '../rootReducer';
import {Middleware} from 'redux';
import browserHistory from '../../browserHistory';

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer> =
  (_store) =>
    (next) =>
      (action) => {
        if (action.type === '/redirectToRoute') {
          browserHistory.push(action.payload);
        }
        return next(action);
      };
