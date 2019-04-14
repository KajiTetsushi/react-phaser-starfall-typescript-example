# react-phaser-starfall-typescript-example

An endless game of "catch the falling stars" written in React v16, Phaser v3, TypeScript and scaffolded with Create React App.

-----
## Running the App

You'll need the latest versions of [Node](https://nodejs.org/) and [Yarn](https://yarnpkg.com/) installed on your local machine.

Then follow these steps:

1. Clone this repository via `git clone` or [download it](https://github.com/KajiTetsushi/react-phaser-starfall-example/archive/master.zip).
2. `yarn` to install all dependencies.
3. `yarn start` to start the app on http://localhost:3000.

Do it like this on terminal / command prompt:

```
git clone https://github.com/KajiTetsushi/react-phaser-starfall-example.git
cd react-phaser-starfall-example
yarn
yarn start
```

-----
## Introduction
This game is my exploring on how to create a game with two major stacks in mind (with two supporting tools):
- [`phaser`](https://github.com/photonstorm/phaser) (version 3) for the frame-by-frame game scene logic.
- [`react`](https://github.com/facebook/react) (version 16.8, with [Hooks](https://reactjs.org/docs/hooks-intro.html)) to build the rest of the UI logic which doesn't involve game scene computations.
- [`create-react-app`](https://github.com/facebook/create-react-app) to help scaffold the codebase quickly and painlessly.
- [TypeScript](https://github.com/Microsoft/TypeScript) (version 3.4) serve as type-safety control over the JavaScript code.

My intended purpose (and firm belief) of putting these two stacks together was to isolate the more mundane stuff from the potentially computationally expensive per-tick update of the core game logic so that the game logic itself can put all of its efforts into the gameplay. That means I'm transferring these things from `phaser`'s `update()` lifecycle method to `react`'s `this.state`:
- the score text
- the image of the currently logged-in player
- the welcoming screen when the player first starts the game
- the final score screen during the "game over" phase

One other benefit I perceive out of this is that for purely nongame purposes, HTML-based components are easier to reason with. Plus, any added benefits of typical Web accessibility concerns can be addressed by simply adding the proper meta attributes that correspond to behaviors such as user input `tabIndex` when one would, need to jump to the proper `<input>` field.

One last reason I wrote this is that, well, I come from the `react` world, so I'm quite familiar with it. This is my first foray into `phaser` and browser-based game development.

------
## `create-react-app` documentation
Oh, it's still around. I've just renamed it so that this readme will be the repository's main document. [Click here for the `create-react-app` readme.](CREATE-REACT-APP-README.md)

------
## To Do

- Write a [`redux`](https://github.com/reduxjs/redux)-integrated example.
- Write proper tests.

------
## Resources

- https://github.com/CraigBeswetherick/Typescript-phaser3-react-redux-boilerplate by [@CraigBeswetherick](https://github.com/CraigBeswetherick)
- https://medium.freecodecamp.org/how-to-build-a-simple-game-in-the-browser-with-phaser-3-and-typescript-bdc94719135 by Mariya Davydova [@mariyadavydova](https://medium.freecodecamp.org/@mariyadavydova)

These materials are what helped me going for the 3+ hours I used while I skimmed through the interwebz for ideas. Many, many thanks to these authors.
