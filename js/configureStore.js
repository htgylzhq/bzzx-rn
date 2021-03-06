import { AsyncStorage, Platform } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import devToolsEnhancer from 'remote-redux-devtools';
import reducer from './reducers';
import promise from './promise';

export default function configureStore(onCompletion:()=>void):any {
  const enhancer = compose(
    applyMiddleware(thunk, promise),
    autoRehydrate(),
    devToolsEnhancer({
      name: `bzzx-${Platform.OS}`,
      hostname: 'localhost',
      port: 5678,
    }),
  );

  const store = createStore(reducer, enhancer);
  persistStore(store, { storage: AsyncStorage }, onCompletion);

  return store;
}
