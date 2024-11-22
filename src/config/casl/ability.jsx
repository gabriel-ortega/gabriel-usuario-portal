
import { AbilityBuilder, Ability } from '@casl/ability';
import permissions from '../permission.json'; 

export const defineAbilitiesFor = (role) => {
  
  const { can, cannot, rules } = new AbilityBuilder(Ability);

  const rolePermissions = permissions[role] || [];

  rolePermissions.forEach(permission => {
    if (permission.conditions) {
      can(permission.action, permission.subject, permission.conditions);
    } else {
      can(permission.action, permission.subject);
    }
  });

  return new Ability(rules);
};
