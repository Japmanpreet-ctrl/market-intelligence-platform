import { prisma } from "@repo/database";

export async function getUserRoles(userId: string): Promise<string[]> {
  const assignments = await prisma.userRole.findMany({
    select: {
      role: {
        select: {
          name: true
        }
      }
    },
    where: { userId }
  });

  return assignments.map((assignment) => assignment.role.name);
}

export async function getUserPermissions(userId: string): Promise<string[]> {
  const assignments = await prisma.userRole.findMany({
    select: {
      role: {
        select: {
          permissions: {
            select: {
              permission: {
                select: {
                  name: true
                }
              }
            }
          }
        }
      }
    },
    where: { userId }
  });

  const permissions = new Set<string>();

  for (const assignment of assignments) {
    for (const rolePermission of assignment.role.permissions) {
      permissions.add(rolePermission.permission.name);
    }
  }

  return [...permissions];
}

export async function hasRole(userId: string, roleName: string): Promise<boolean> {
  const count = await prisma.userRole.count({
    where: {
      role: {
        name: roleName
      },
      userId
    }
  });

  return count > 0;
}

export async function hasPermission(
  userId: string,
  permissionName: string
): Promise<boolean> {
  const count = await prisma.userRole.count({
    where: {
      role: {
        permissions: {
          some: {
            permission: {
              name: permissionName
            }
          }
        }
      },
      userId
    }
  });

  return count > 0;
}
