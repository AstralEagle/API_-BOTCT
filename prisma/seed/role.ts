import { PrismaClient } from '@prisma/client';

type Role = {
  id: number;
  name: string;
  description: string;
  team: number;
};

const roles: Role[] = [
  {
    id: 1,
    name: 'Lavandière',
    description:
      'Votre première nuit, le Conteur vous montre 2 joueurs: vous apprenez le rôle de Villageois de l’un des deux.',
    team: 1,
  },
  {
    id: 2,
    name: 'Archiviste',
    description: '',
    team: 1,
  },
  {
    id: 3,
    name: 'Enquêteur',
    description: '',
    team: 1,
  },
  {
    id: 4,
    name: 'Cuistot',
    description: '',
    team: 1,
  },
  {
    id: 5,
    name: 'Empathique',
    description: '',
    team: 1,
  },
  {
    id: 6,
    name: 'Voyante',
    description: '',
    team: 1,
  },
  {
    id: 7,
    name: 'Croque-mort',
    description: '',
    team: 1,
  },
  {
    id: 8,
    name: 'Moine',
    description: '',
    team: 1,
  },
  {
    id: 9,
    name: 'Gardien',
    description: '',
    team: 1,
  },
  {
    id: 10,
    name: 'Vierge',
    description: '',
    team: 1,
  },
  {
    id: 11,
    name: 'Mercenaire',
    description: '',
    team: 1,
  },
  {
    id: 12,
    name: 'Soldat',
    description: '',
    team: 1,
  },
  {
    id: 13,
    name: 'Maire',
    description: '',
    team: 1,
  },
  {
    id: 14,
    name: 'Majordome',
    description: '',
    team: 2,
  },
  {
    id: 15,
    name: 'Soûlard',
    description: '',
    team: 2,
  },
  {
    id: 16,
    name: 'Reclus',
    description: '',
    team: 2,
  },
  {
    id: 17,
    name: 'Vertueux',
    description: '',
    team: 2,
  },
  {
    id: 18,
    name: 'Empoisonneur',
    description: '',
    team: 3,
  },
  {
    id: 19,
    name: 'Espion',
    description: '',
    team: 3,
  },
  {
    id: 20,
    name: "Croqueuse d'Homme",
    description: '',
    team: 3,
  },
  {
    id: 21,
    name: 'Baron',
    description: '',
    team: 3,
  },
  {
    id: 22,
    name: 'Diablotin',
    description: '',
    team: 4,
  },
];

const seedRole = async (prisma: PrismaClient) => {
  for (const role of roles) {
    await prisma.role.upsert({
      where: {
        id: role.id,
      },
      update: role,
      create: role,
    });
  }
};
export default seedRole;
