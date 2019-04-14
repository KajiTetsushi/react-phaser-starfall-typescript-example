import { Scene, Physics, GameObjects, Actions, Geom, Math as Mathematics } from 'phaser';
import { start } from 'repl';

export class GameScene extends Scene {
  delta: number = 1000;
  lastStarTime: number = 0;
  starsCaught: number = 0;
  starsFallen: number = 0;
  starsMaxFallen: number = 0;
  sand!: Physics.Arcade.StaticGroup;
  // TODO: Delegate this to React.
  // info!: GameObjects.Text;

  static maxFallenStars: number = 3;

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

    // TODO: Delegate this to React.
    // const textStyle = {
    //   font: '24px Arial Bold',
    //   fill: '#FBFBAC'
    // };

    // this.info = this.add.text(10, 10, '', textStyle);
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

    // TODO: Delegate this to React.
    // this.info.text = `${this.starsCaught} caught - ${this.starsFallen} fallen (max: ${this.starsMaxFallen})`;
  }

  stopScene = () => {
    if (this.starsFallen < this.starsMaxFallen) {
      return;
    }

    // this.scene.start('ScoreScene', {
    //   starsCaught: this.starsCaught,
    // });

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
    this.game.events.emit('onstarcaught', {
      starsCaught: this.starsCaught,
    });
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
    this.game.events.emit('onstarfallen', {
      starsFallen: this.starsFallen,
    });
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