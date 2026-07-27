const invalid = (error) => ({ ok: false, error });

export const validatePetitionBody = (body) => {
  const fullName = (body.fullName ?? "").trim();
  const email = (body.email ?? "").trim().toLowerCase();
  const city = (body.city ?? "").trim();
  const comment = (body.comment ?? "").trim();

  if (fullName.length < 3 || fullName.length > 120) {
    return invalid("Va rugam introduceti numele complet.");
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || email.length > 254) {
    return invalid("Adresa de email nu este valida.");
  }
  if (city.length > 80) return invalid("Localitatea este prea lunga.");
  if (comment.length > 2_000) return invalid("Mesajul este prea lung.");

  return { ok: true, value: { fullName, email, city, comment } };
};

