export interface DevItem {
  name: string;
  desc: string;
  url?: string;
}

export const GAMEDEVELOPMENTENGINESANDTOOLS_ITEMS: DevItem[] = [
  { name: "Unity", desc: "A leading cross-platform game engine.", url: "https://unity.com/" },
  { name: "Unreal Engine", desc: "A powerful and widely-used game engine.", url: "https://www.unrealengine.com/" },
  { name: "Godot", desc: "A feature-rich, open-source game engine.", url: "https://godotengine.org/" },
  { name: "CryEngine", desc: "A game engine designed for AAA games.", url: "https://www.cryengine.com/" },
  { name: "Phaser", desc: "A fast, free, and fun open-source HTML5 game framework.", url: "https://phaser.io/" },
  { name: "GameMaker Studio", desc: "A tool for creating 2D games.", url: "https://www.yoyogames.com/en/gamemaker" },
  { name: "Ren'Py", desc: "A visual novel engine.", url: "https://www.renpy.org/" },
  { name: "Construct", desc: "An HTML5 game maker.", url: "https://www.construct.net/" },
  { name: "LibGDX", desc: "A Java game development framework.", url: "https://libgdx.com/" },
  { name: "SFML", desc: "A simple and fast multimedia library for C++.", url: "https://www.sfml-dev.org/" },
  { name: "SDL", desc: "A cross-platform development library for multimedia.", url: "https://www.libsdl.org/" },
  { name: "Bevy", desc: "A refreshingly simple data-driven game engine built in Rust.", url: "https://bevyengine.org/" },
];
