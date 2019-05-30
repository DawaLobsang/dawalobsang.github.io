let target = [];
let ammo = [];
let bullet = [];
//change xvel back to 1
let xvel = 1;
//change yvel back to .5
let yvel = .5;
let x = 250;
let z = 0;
let v = 0;
let c = 1;
let d = 6;
let img;
let kvel = -10;
let t, y, u, f, h, o, g, e, r;
let level = -1;
let score = 0;
let player = 0;
let hit = 1000;
let health = 10000;
let q = 600;
let i = 0;

class Target {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.size = r;
    }
    move() {
        this.x = this.x + xvel;
        this.y = this.y + yvel;
    }
    show() {
        fill(0, 255, 0);
        rect(this.x, this.y, this.size, this.size);
    }
    bounce() {
        if (this.x >= width - 30 || this.x <= 0) {
            print("Bounced");
            xvel = - xvel;
        }
    }
    over() {
        if (this.y >= height - 30) {
            gameover();
        }
    }
    hitbox() {
        for (let i = 0; i < d; i++) {
            fill(0);
        }
    }
}

class Ammo {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    move() {
        this.y = this.y + kvel;
    }
    show() {
        fill(0, 255, 0);
        rect(this.x, this.y, 5, 10);
    }
    attack() {
        e = this.x;
        r = this.y;
    }

}

function shooter() {
    fill(200);
    rect(x, height - 30, 15, 45);
    x = constrain(x, 0, width - 15);
    if (keyIsPressed) {
        if (key == "a") {
            x -= 2;
            console.log("LEFT");
        }
        else if (key == "d") {
            x += 2;
            console.log("RIGHT");
        }
    }
}

function keyPressed() {
    if (key == "w") {
        print("shot")
        v = v + 1;
        for (let a = 0; a < v; a++) {
            let g = x + 5;
            h = 570;
            ammo.push(ammo[a]);
            ammo[a] = new Ammo(g, h);
        }
    }
}

function setup() {
    createCanvas(500,600);
    for (let i = 0; i < d; i++) {
        let g = 30 + 75 * i;
        target[i] = new Target(g, 30, 30);
    }
}

function draw() {
    background(0);
    shooter();
    if (keyCode == 80) {
        level = 0;
        print("level start");
    }
    if (level == 0) {
        for (let i = 0; i < d; i++) {
            target[i].show();
            target[i].move();
            target[i].bounce();
            target[i].over();
        }
        for (let a = 0; a < ammo.length; a++) {
            ammo[a].show();
            ammo[a].move();
            for (let i = 0; i < d; i++) {
                t = target[i].x;
                y = target[i].x + 30;
                u = target[i].y;
                f = target[i].y + 30;
                if (ammo[a].x >= t && ammo[a].x <= y && ammo[a].y >= u && ammo[a].y <= f) {
                    console.log("hit");
                    target[i].hitbox();
                }
            }
        }
    }
    fill(255,255,255);
    textSize(12);
    text("Score: " + score, 10, 25);
}

function gameover() {
    document.querySelector("#gameover").innerHTML = "GAME OVER";
    document.querySelector("#score").innerHTML = "Your score: " + score;
}