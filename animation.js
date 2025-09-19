// animation.js

import { Particle } from './particle.js';

export class Animation {
    constructor(context, width, height, fps) {
        this.context = context
        this.width = width
        this.height = height
        this.fps = fps
        this.particles = []
        this.scale = 4

        this.framecount = 0
        this.timecycle = 0

        this.tmp = 0

        console.log(`animation area:\n width: ${width}, height: ${height}`)
    }

    update() {
        let dw = this.width / 2
        let dh = this.height / 2
        let r_max = Math.sqrt(dw * dw + dh * dh)


        this.framecount += 1
        this.framecount %= (this.timecycle * this.fps)

        if (this.framecount == 300) {
            this.tmp = this.getText2Targets("Hello")
        }

        if (this.framecount == 1000) {
            this.getText2Boom(this.tmp)
        }

        if (this.framecount == 2000) {
            this.tmp = this.getText2Targets("World")
        }

        if (this.framecount == 2700) {
            this.getText2Boom(this.tmp)
        }


        this.context.clearRect(0,0,this.width, this.height)
        if (this.particles.length > 0) {
            for (let i=this.particles.length-1; i>0; i--) {
                let p = this.particles[i]
                p.move()
                p.draw(this.context)
                if (((this.framecount > 1000 && this.framecount < 2000) || this.framecount > 2700) && p.isStatic()) {
                    let dx = p.x - dw
                    let dy = p.y - dh
                    let r = Math.sqrt(dx * dx + dy * dy)
                    p.setCircleMode(dw, dh, 0.001 + 0.005 * r / r_max)
                    p.setColor("#FFFFFF")
                }
            }
        }
    }

    init(timecycle) {
        this.timecycle = timecycle
        let dw = this.width / 2
        let dh = this.height / 2
        let r_max = Math.sqrt(dw * dw + dh * dh)

        for (let i=0; i < 1999; i++) {
            let r = Math.random() * 10 +  Math.random() * (r_max - 10)
            let theta = Math.random() * Math.PI * 2
            let x = dw + r * Math.cos(theta)
            let y = dh + r * Math.sin(theta)
            let p = new Particle(x, y, "#FFFFFF", this.scale - 2 + 2 * r / r_max)
            p.setCircleMode(dw, dh, 0.001 + 0.005 * r / r_max)
            this.particles.push(p)
        }
    }

    getText2Boom(cnt) {
        console.log(`${cnt} particles get boom !`)
        let dw = this.width / 2
        let dh = this.height / 2
        let r_max = Math.sqrt(dw * dw + dh * dh)

        for (let i=0; i < cnt; i++) {
            let r = Math.random() * r_max
            let theta = Math.random() * Math.PI * 2
            let x = dw + r * Math.cos(theta)
            let y = dh + r * Math.sin(theta)
            let p = this.particles[i]
            p.setTargetMode(x, y, 3, false)
            p.setColor("#FFFFFF")
        }
    }

    getText2Targets(text) {
        let cnt = 0
        let opl = this.particles.length
        this.context.clearRect(0, 0, this.width, this.height)
        // 设置画笔颜色
        let grad = this.context.createLinearGradient(0, 0, this.width, this.height)
        grad.addColorStop(0.3, 'red')
        grad.addColorStop(0.5, 'orange')
        grad.addColorStop(0.7, 'green')
        this.context.fillStyle = grad
        // 在画布上写入文字
        let fontSize = Math.min(this.width, this.height) / text.length
        this.context.font = `${fontSize}px arial`
        this.context.textAlign = "center"
        this.context.textBaseline = "middle"
        this.context.lineWidth = this.scale
        this.context.fillText(text, this.width / 2, this.height / 2)
        this.context.strokeStyle = "gold"
        this.context.lineWidth = this.scale
        this.context.strokeText(text, this.width / 2, this.height / 2)
        // 获取文字位置及颜色数据
        let data = this.context.getImageData(0, 0, this.width, this.height).data
        for (let y = 0; y < this.height; y += this.scale) {
            for (let x = 0; x < this.width; x += this.scale) {
                let index = (y * this.width + x) * 4
                if (data[index + 3] > 0) {
                    let r = data[index]
                    let g = data[index + 1]
                    let b = data[index + 2]
                    let color = `rgb(${r},${g},${b})`
                    if (cnt < opl) {
                        let p = this.particles[cnt]
                        p.setTargetMode(x, y, this.scale / 2, true)
                        p.setColor(color)
                        p.setSize(this.scale)
                    } else{
                        let t = this.particles[cnt - opl]
                        let p = new Particle(t.x, t.y, color, this.scale - 1 + Math.random())
                        p.setTargetMode(x, y, this.scale / 2, true)
                        p.setColor(color)
                        p.setSize(this.scale)
                        this.particles.push(p)
                    }
                    cnt += 1
                }
            }
        }
        this.context.clearRect(0, 0, this.width, this.height)
        console.log(`text consist of ${cnt} particles`)
        return cnt
    }

    firework() {
    }
}