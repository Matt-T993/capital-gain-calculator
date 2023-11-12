import { userContext, createContext } from 'react';

export const AssetContext = createContext({
  assets:[],
  ready:false
});
