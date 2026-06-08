import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const roles = [
  { name: "Admin", description: "Platform administration role." },
  { name: "User", description: "Default platform user role." },
  { name: "Partner", description: "Partner ecosystem access role." },
  { name: "Support", description: "Customer support operations role." }
];

const permissions = [
  { name: "users.read", description: "Read user identity records." },
  { name: "users.write", description: "Manage user identity records." },
  { name: "content.read", description: "Read managed content." },
  { name: "content.write", description: "Manage content drafts and publishing." },
  { name: "analytics.read", description: "Read analytics workspace data." },
  { name: "support.read", description: "Read support context." },
  { name: "support.write", description: "Manage support workflows." }
];

const rolePermissionNames: Record<string, string[]> = {
  Admin: permissions.map((permission) => permission.name),
  Partner: ["content.read", "analytics.read"],
  Support: ["users.read", "support.read", "support.write"],
  User: ["content.read", "analytics.read"]
};

async function main() {
  for (const role of roles) {
    await prisma.role.upsert({
      create: role,
      update: { description: role.description },
      where: { name: role.name }
    });
  }

  for (const permission of permissions) {
    await prisma.permission.upsert({
      create: permission,
      update: { description: permission.description },
      where: { name: permission.name }
    });
  }

  for (const [roleName, permissionNames] of Object.entries(rolePermissionNames)) {
    const role = await prisma.role.findUniqueOrThrow({ where: { name: roleName } });

    for (const permissionName of permissionNames) {
      const permission = await prisma.permission.findUniqueOrThrow({
        where: { name: permissionName }
      });

      await prisma.rolePermission.upsert({
        create: {
          permissionId: permission.id,
          roleId: role.id
        },
        update: {},
        where: {
          roleId_permissionId: {
            permissionId: permission.id,
            roleId: role.id
          }
        }
      });
    }
  }
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
