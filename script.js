// script.js

import { Animation } from "./animation.js";


const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fps = 60
const ani = new Animation(ctx, canvas.width, canvas.height, fps)
ani.init(50)


setInterval(()=>{ani.update()}, 1000 / fps)