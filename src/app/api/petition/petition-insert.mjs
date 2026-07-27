export const classifyPetitionInsert = (status) => {
  if ((status >= 200 && status < 300) || status === 409) {
    return { body: { ok: true }, status: 201 };
  }
  return {
    body: { error: "A aparut o eroare. Va rugam incercati din nou." },
    status: 500,
  };
};

