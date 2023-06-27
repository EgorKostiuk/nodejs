import { fightRepository } from "../repositories/fightRepository.js";

class FightersService {
  // OPTIONAL TODO: Implement methods to work with fights
  getAllFights() {
    return fightRepository.getAll();
  }

  getFightById(id) {
    return fightRepository.getById(id);
  }

  createFight(fighter1, fighter2) {
    const newFight = {
      fighter1,
      fighter2,
      winner: null,
    };
    return fightRepository.create(newFight);
  }

  updateFight(id, fighter1Shot, fighter2Shot) {
    const fight = fightRepository.getById(id);
    if (!fight) {
      return null;
    }
    fight.fighter1Shot = fighter1Shot;
    fight.fighter2Shot = fighter2Shot;
    fight.winner = this.calculateWinner(fighter1Shot, fighter2Shot);
    return fightRepository.update(fight);
  }

  deleteFight(id) {
    return fightRepository.delete(id);
  }

}

const fightersService = new FightersService();

export { fightersService };
