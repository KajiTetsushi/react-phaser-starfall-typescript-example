import { Scene, Physics, Actions, Geom, Math as Mathematics } from 'phaser';

export class GameScene extends Scene {
  delta: number = 1000;
  lastStarTime: number = 0;
  starsCaught: number = 0;
  starsFallen: number = 0;
  starsMaxFallen: number = 0;
  sand!: Physics.Arcade.StaticGroup;

  static maxFallenStars: number = 1;

  constructor() {
    super({
      key: 'GameScene',
    });
  }

  init() {
    this.starsMaxFallen = GameScene.maxFallenStars;
  }

  preload() {
    const baseUrl = 'https://raw.githubusercontent.com/mariyadavydova/starfall-phaser3-typescript/master/';
    this.load.setBaseURL(baseUrl);
    this.load.image('star', 'assets/star.png');
    this.load.image('sand', 'assets/sand.jpg');
  }

  create() {
    this.sand = this.physics.add.staticGroup({
      key: 'sand',
      frameQuantity: 20,
    });

    Actions.PlaceOnLine(
      this.sand.getChildren(),
      new Geom.Line(20, 580, 820, 580)
    );

    this.sand.refresh();
  }

  update(time: number) {
    const diff: number = time - this.lastStarTime;

    if (diff > this.delta) {
      this.lastStarTime = time;

      if (this.delta > 500) {
        this.delta -= 20;
      }

      this.emitStar();
    }
  }

  stopScene = () => {
    if (this.starsFallen < this.starsMaxFallen) {
      return;
    }

    this.game.events.emit('onscenestop');

    this.scene.stop();
  }

  destroyStar = (star: Physics.Arcade.Image, onDestroyStar?: Function) => () => {
    star.destroy();

    if (!onDestroyStar) {
      return;
    }

    onDestroyStar();
  }

  handlePointerDown = (star: Physics.Arcade.Image) => () => {
    star.setTint(0x00ff00);
    star.setVelocity(0, 0);
    this.starsCaught += 1;
    this.game.events.emit('onstarcaught', this.starsCaught);
    this.time.delayedCall(
      100,
      this.destroyStar(star),
      [star],
      this
    );
  }

  handleCollide = (star: Physics.Arcade.Image) => () => {
    star.setTint(0xff0000);
    this.starsFallen += 1;
    this.game.events.emit('onstarfallen', this.starsFallen);
    this.time.delayedCall(
      100,
      this.destroyStar(star, this.stopScene),
      [star],
      this
    );
  }

  private onPointerDown(star: Physics.Arcade.Image): () => void {
    return this.handlePointerDown(star);
  }

  private onCollide(star: Physics.Arcade.Image) {
    return this.handleCollide(star);
  }

  private emitStar() {
    const x = Mathematics.Between(25, 775);
    const y = 26;
    const star: Physics.Arcade.Image = this.physics.add.image(x, y, 'star');

    star.setDisplaySize(50, 50);
    star.setVelocity(0, 200);
    star.setInteractive();

    star.on('pointerdown', this.onPointerDown(star), this);
    this.physics.add.collider(star, this.sand, this.onCollide(star), undefined, this);
  }
}