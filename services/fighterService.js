import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  // TODO: Implement methods to work with fighters
  getAllFighters() {
    return fighterRepository.getAll();
  }

  getFighterById(id) {
    return fighterRepository.getById(id);
  }

  createFighter(fighterData) {
    return fighterRepository.create(fighterData);
  }

  updateFighter(id, updatedFighterData) {
    return fighterRepository.update(id, updatedFighterData);
  }

  deleteFighter(id) {
    return fighterRepository.delete(id);
  }
}

const fighterService = new FighterService();

export { fighterService };
