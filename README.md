# react-phaser-starfall-typescript-example

An endless game of "catch the falling stars" written in React v16, Phaser v3, TypeScript and scaffolded with Create React App.

-----

- [Running the App](#running-the-app)
- [Introduction](#introduction)
  - [I Have My Reasons](#i-have-my-reasons)
- [`create-react-app` documentation](#create-react-app-documentation)
- [Resources](#resources)

-----

## Running the App

You'll need the latest versions of [Node](https://nodejs.org/) and [Yarn](https://yarnpkg.com/) installed on your local machine.

Then follow these steps:

1. Clone this repository via `git clone` or [download it](https://github.com/KajiTetsushi/react-phaser-starfall-example/archive/master.zip).
2. `yarn` to install all dependencies.
3. `yarn start` to start the app on [http://localhost:3000](http://localhost:3000).

Do it like this on terminal / command prompt:

```sh
git clone https://github.com/KajiTetsushi/react-phaser-starfall-example.git
cd react-phaser-starfall-example
yarn
yarn start
```

## Introduction

My code explores the possibility of creating a game with two major stacks in mind:

- [`phaser`](https://github.com/photonstorm/phaser) for the frame-by-frame game scene logic.
- [`react`](https://github.com/facebook/react) to build the rest of the UI logic which doesn't involve game scene computations.

### I Have My Reasons

1. To isolate the more mundane stuff from the potentially computationally expensive per-tick update of the core game logic so that the game logic itself can put all of its efforts into the gameplay. That means I'm transferring these things from `phaser`'s `update()` lifecycle method to `react`'s state values via `useState()`:

    - the score text
    - the final score screen during the "game over" phase

2. For purely nongame purposes, HTML-based components are easier to reason with. Any added benefits of typical Web accessibility concerns can be addressed by simply adding the proper meta attributes that correspond to behaviors such as user input `tabIndex` when one would, need to jump to the proper `<input>` field.

3. I didn't want to throw my React experience away.

## `create-react-app` documentation

Oh, it's still around. I've just renamed it so that this readme will be the repository's main document. [Click here for the `create-react-app` readme.](./docs/create-react-app/README.md)

## Resources

- [Typescript-phaser3-react-redux-boilerplate](https://github.com/CraigBeswetherick/Typescript-phaser3-react-redux-boilerplate) by CraigBeswetherick
- [How to build a simple game in the browser with Phaser 3 and TypeScript
](https://medium.freecodecamp.org/how-to-build-a-simple-game-in-the-browser-with-phaser-3-and-typescript-bdc94719135) by Mariya Davydova

These materials are what helped me going for the 3+ hours I used while I skimmed through the interwebz for ideas. Many, many thanks to these authors.
