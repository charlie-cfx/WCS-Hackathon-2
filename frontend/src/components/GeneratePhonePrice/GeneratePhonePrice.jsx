const phones = {
  ram: 6,
  storage: 20,
  cameraResolution: 4,
};

// Pondérations des caractéristiques
const weights = {
  ramWeight: 0.8,
  storageWeight: 10,
  cameraWeight: 0.8,
};

// Fonction de calcul du prix
export default function calculatePhonePrice() {
  const { ram, storage, cameraResolution } = phones;
  const { ramWeight, storageWeight, cameraWeight } = weights;
  // Calcul des scores pondérés
  const ramScore = ram * ramWeight;
  const storageScore = storage * storageWeight;
  const cameraScore = cameraResolution * cameraWeight;

  // Calcul du prix en utilisant les scores pondérés
  const price = ramScore + storageScore + cameraScore;
  return price;
}
