// src/AbilityContext.js
import{ createContext, useContext } from 'react';
import { Ability } from '@casl/ability';
const AbilityContext = createContext(null);

export const AbilityProvider = ({ ability, children }) => (
  <AbilityContext.Provider value={ability}>
    {children}
  </AbilityContext.Provider>
);

export const useAbility = () => useContext(AbilityContext);
