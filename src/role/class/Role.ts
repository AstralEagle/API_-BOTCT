class Role {
  private id: number;
  private name: string;
  private team: number;
  private isDead: boolean;
  private haveVote: boolean;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.isDead = false;
    this.haveVote = false;
    this.team = 0;
  }

  public getId() {
    return this.id;
  }
  public getName() {
    return this.name;
  }
  public getTeam() {
    return this.team;
  }
  public getIsDead() {
    return this.isDead;
  }
  public getHaveVote() {
    return this.haveVote;
  }

  firstPlaceNight() {}
  secondPlaceNight() {}
  thirdPlaceNight() {}
  fourthPlaceNight() {}

  firstNight() {}

  onDay() {}

  onNomination() {}
  onDiedDay() {}
  onDieNight() {}
}
