// particle.js

export class Particle {
    constructor(x, y, color, size) {
        this.x = x
        this.y = y
        this.color = color
        this.size = size
        // TargetMode
        this.isTargetMode = false
        this.keep = false
        this.ox = 0
        this.oy = 0
        this.speed = 0
        // SpeedMode
        this.isSpeedMode = false
        this.vx = 0
        this.vy = 0
        // CircleMode
        this.isCircleMode = false
        this.cx = 0
        this.cy = 0
        this.r = 0
        this.w = 0
    }

    isStatic() {
        return !this.isTargetMode && !this.isSpeedMode && !this.isCircleMode
    }

    setColor(color) {
        this.color = color
    }

    setSize(size) {
        this.size = size
    }

    move() {
        if (this.isSpeedMode) {
            this.x += this.vx
            this.y += this.vy
        } else if (this.isTargetMode) {
            if (this.x != this.ox || this.y != this.oy) {
                const dx = this.ox - this.x
                const dy = this.oy - this.y
                const distance = Math.sqrt(dx * dx + dy * dy)
                if (distance <= this.speed) {
                    this.x = this.ox
                    this.y = this.oy
                } else {
                    this.x += dx / distance * this.speed
                    this.y += dy / distance * this.speed
                }
            } else {
                this.isTargetMode = false
                if (!this.keep) {
                    this.isCircleMode = true
                }
            }
        } else if (this.isCircleMode) {
            let ar = Math.atan2((this.y - this.cy), (this.x - this.cx))
            this.x = this.cx + this.r * Math.cos(ar + this.w)
            this.y = this.cy + this.r * Math.sin(ar + this.w)
        }else {
            this.isSpeedMode = false
            this.isTargetMode = false
            this.isCircleMode = false
        }
    }

    setTargetMode(ox, oy, speed, keep) {
        // keep 标记：移动到目标位置是否保持静止，反之圆周运动
        this.isSpeedMode = false
        this.isTargetMode = true
        this.isCircleMode = false
        this.keep = keep
        this.ox = ox
        this.oy = oy
        this.speed = speed
    }

    setSpeedMode(vx, vy) {
        this.isSpeedMode = true
        this.isTargetMode = false
        this.isCircleMode = false
        this.vx = vx
        this.vy = vy
    }

    setCircleMode(cx, cy, w) {
        this.isSpeedMode = false
        this.isTargetMode = false
        this.isCircleMode = true
        this.w = w
        this.cx = cx
        this.cy = cy
        let dx = this.x - cx
        let dy = this.y - cy
        this.r = Math.sqrt(dx * dx + dy * dy)
    }

    draw(context) {
        let ds = this.size / 2
        context.beginPath()
        context.fillStyle = this.color
        context.fillRect(this.x - ds, this.y - ds, this.size, this.size)
    }
}