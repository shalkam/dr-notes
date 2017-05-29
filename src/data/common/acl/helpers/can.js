import roleResolver from './role-resolver.js';

export default async (req, acl, { resource, resourceType, permission }) => {
  const userAllowed = await acl.isAllowed(req.user.id, resourceType, permission);
  const rolesAllowed = await acl.areAnyRolesAllowed(
    roleResolver.getDynamicRoles(req, acl, { resource, resourceType, permission }),
    resourceType,
    permission
  );
  return userAllowed === true || rolesAllowed === true;
};
