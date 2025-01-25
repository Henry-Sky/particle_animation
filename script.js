let canvas = document.getElementById("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
let ctx = canvas.getContext("2d")
let msg =document.getElementById("msg")
let gap = 3
let grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
grad.addColorStop(0.3, 'green')
grad.addColorStop(0.5, 'orange')
grad.addColorStop(0.3, 'red')
ctx.fillStyle = grad
ctx.fillRect(0, 0, canvas.width, canvas.height)

