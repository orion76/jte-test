export const USER_ROLES = [
  { id: 'anonym', description: 'An unauthorized user' },
  { id: 'authorized', description: 'Authorized user' },
] as const;

export type UUserRole = (typeof USER_ROLES)[number]['id'];

