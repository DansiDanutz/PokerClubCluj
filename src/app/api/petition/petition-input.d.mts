export type PetitionInput = {
  fullName?: string;
  email?: string;
  city?: string;
  comment?: string;
};

export function validatePetitionBody(body: PetitionInput):
  | {
      ok: true;
      value: { fullName: string; email: string; city: string; comment: string };
    }
  | { ok: false; error: string };

