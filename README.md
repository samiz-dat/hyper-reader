# Hyper Reader

**This is a work in progress.**

An editor for [HyperReadings](https://github.com/sdockray/hyperreadings) built with [Substance](http://substance.io/).
The structure of this application is indebted to [Texture](https://github.com/substance/texture).

## Installation

Currently you need to use a terminal on your computer to install and run this project (e.g. the application Terminal on macOS).

### Getting the source code

The best way to get the files for this project is with the version control system [git](https://git-scm.com/).
Follow the [git installation instructions](https://git-scm.com/downloads) for your operating system.

Once you have git, clone the source code repository down to your machine.

In your terminal application, enter:

```
git clone https://github.com/e-e-e/hyper-reader.git
```

And then change to the project directory:

```
cd ./hyper-reader
```

### Installing Node and dependencies

This project is build on [Node](https://nodejs.org/en/) (version 8 or greater).
We recommend that you install it and manage Node versions using [nvm](https://github.com/creationix/nvm).
Restart your terminal application.

Follow [the installation instructions with nvm](https://github.com/creationix/nvm#installation), and once it is installed, install Node 8:

```
nvm install 8
```

Now use [npm](https://www.npmjs.com/) (comes with Node) to install the Node modules this project depends on:

```
npm install
```

## Running the application

In your terminal session, enter:

```
npm run app
```

This will compile the source code and launch the application as [an Electron app](https://electronjs.org/).
You are in development mode, so whenever you change the source code, Electron will automatically recompile.

You'll need to refresh the app (control + R) to see changes.
