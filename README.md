# Hyper Reader

[![Greenkeeper badge](https://badges.greenkeeper.io/samiz-dat/hyper-reader.svg)](https://greenkeeper.io/)

**This is a work in progress.**

An editor for [HyperReadings](https://github.com/sdockray/hyperreadings) built with [Substance](http://substance.io/).
The structure of this application is indebted to [Texture](https://github.com/substance/texture).

## Installation

Simply install the current pre-built release for your operating system:

- [Mac OSX](https://github.com/e-e-e/hyper-reader/releases/download/v0.0.3-3/HyperReader-0.0.3-3.dmg)
- [Linux](https://github.com/e-e-e/hyper-reader/releases/download/v0.0.3-3/HyperReader-0.0.3-3-x86_64.AppImage)
- [Windows](https://github.com/e-e-e/hyper-reader/releases/download/v0.0.3-3/HyperReader-Setup-0.0.3-3.exe)

[View all releases](https://github.com/e-e-e/hyper-reader/releases)

**Note:** Hyper Reader is currently an unsigned application so you may receive warnings or may be unable to open it on your computer without consenting. Each operating system is different, but look at you can find instructions for how to open this app on a mac [here](https://www.howtogeek.com/205393/gatekeeper-101-why-your-mac-only-allows-apple-approved-software-by-default/).

Alternatively, you can build the application yourself from the source code.

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

## Reading Lists

Public reading lists are available at www.hyperreadings.info
