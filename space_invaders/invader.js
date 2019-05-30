let ammo = [];
let target = [];
let bullet = [];
let boss = [];
//change xvel back to 1
let xvel = 1;
//change yvel back to .5
let yvel = .25;
let x = 250;
let z = 0;
let v = 0;
let c = 1;
let d = 6;
let img;
let kvel = -5;
let t, y, u, f, h, o, boss1;
let level = -1;
let score = 0;
let player = 0;
let hit = 1000;
let health = 10000;
let q = 600;

//make it so if the player hits score of 1000, a final box appears that  can shoot.
function shooter() {
    fill(200);
    rect(x, height - 30, 15, 45);
    if (keyIsPressed) {
        if (key == "a") {
            x -= 2;
        }
        else if (key == "d") {
            x += 2;
        }
    }
}

function keyTyped() {
    if (key == "w") {
        // === true;
        //if (l === true) {
            //setTimeout(keyTyped(), 1000)
        //}
        v += 1;
        z = x + 5;
        for (let a = 0; a < v; a++) {
            ammo[a] = {
                j: z,
                k: height - 30
            }
            ammo.push(ammo[a]);
        }
        if (level == 3) {
            u += 1;
            for (let b = 0; b < u; b++) {
                ammo[b] = {
                    y: x + 5,
                    o: 0
                }
                ammo.push(ammo[b]);
            }
        }
    }
}

function setup() {
    createCanvas(500,600);
    for (let i = 0; i < d; i++) {
        target[i] = {
            x: 30 + 75 * i,
            y: 30,
            size: 30
        }
    }
    for (let p = 0; p < 1; p++) {
        boss[p] = {
            x: 50,
            y: 50,
            size: 80
        }
    }
}

function draw() {
    background(0);
    shooter();
    if (keyCode == 80) {
        level = 0;
    }
    if (level == 0) {
        for (let i = 0; i < d; i++) {
            target.push(target[i]);
            fill(0, 255, 0);
            rect(target[i].x, target[i].y, target[i].size, target[i].size)
            target[i].x += xvel;
            target[i].y += yvel;
            if (target[i].x >= width - 30|| target[i].x <= 0) {
                xvel = - xvel;
            }
            if (target[i].y == height - 30 || target[i].y == 15) {
                gameover();
                yvel = - yvel;
                d = d + 3;
                target[i].y += 15;
            }
        }
        for (let a = 0; a < ammo.length - 1; a++) {
            fill(255)
            rect(ammo[a].j, ammo[a].k, 5, 10)
            ammo[a].k += kvel;
            if (ammo[a].k <= 0) {
                ammo.splice(a, 1);
            }
            for (let i = 0; i < d; i++) {
                t = target[i].x - 10;
                y = target[i].x + 30;
                u = target[i].y - 10;
                f = target[i].y + 30;
                if (ammo[a].j >= t && ammo[a].j <= y && ammo[a].k >= u && ammo[a].k <= f) {
                    fill(0, 0, 0);
                    target.splice(i, 1);
                    ammo.splice(a, 1);
                    score = score + 50;
                    // make hitbox bigger so it isn't just the center of the target
                    if (score == player + 200) {
                        for (i = 0; i < d; i++) {
                            target[i].x = 30 + 75 * i;
                            target[i].y = 30;
                        }
                        player = 200;
                    }
                    if (score == 1000000) {
                        level = 2;
                        target.splice(i, 6);
                    }
                }
            }
        }
    }
    fill(255,255,255);
    textSize(12);
    text("Score: " + score, 10, 25);
    if (level == 2 || level == 3) {
    newLevel();
    }
}

function newLevel() {
    background(0);
    fill(255, 255, 255);
    textSize(25);
    shooter();
    text("Press spacebar to move to the Boss level :)", 0, 200) //make it so it disappears after level starts//
    if (level == 2 && keyCode == 32) {
        level = 3;
    }
    if (level == 3) {
        console.log("level 3");
        fill(255,255,255);
        textSize(12);
        text("Boss Health: " + health, 10, 35);
        fill(255,255,255);
        textSize(12);
        text("Score: " + score, 10, 25);
        fill(255,255,255);
        textSize(12);
        text("Your health: " + hit, 10, 45)
        for (let p = 0; p < 1; p++) {
            boss.push(boss[p]);
            fill(255,255,255)
            rect(boss[p].x, boss[p].y, boss[p].size, boss[p].size)
            boss[p].y += yvel;
            if (boss[p].x + 40 >= width - 40 || boss[p].x <= 0) {
                xvel = -xvel;
            }
            if (boss[p].y + 40 >= height) {
                gameover();
            }
        }
        for (let a = 0; a < ammo.length - 1; a++) {
            fill(255)
            rect(ammo[a].j, ammo[a].k, 5, 10);
            ammo[a].k += kvel;
            for (let p = 0; p < 1; p++) {
                t = boss[p].x - 7;
                y = boss[p].x + 80;
                u = boss[p].y;
                f = boss[p].y + 80;
                if (ammo[a].j >= t && ammo[a].j <= y && ammo[a].k >= u && ammo[a].k <= f) {
                    console.log("HIT");
                    ammo.splice(a, 1)
                    score = score + 50;
                    health = health - 10;
                }
            }
        }
        for (let b = 0; b < u; b++) {
            fill(0,255,0);
            rect(ammo[b].y, ammo[b].o, 10, 20)
            ammo[b].o -= 2 * kvel;
            if (ammo[b].y >= x && ammo[b].y <= x + 5 && ammo[b].o == height - 30) {
               hit -= 100;
            }
        }
    }
}
function gameover() {
    document.querySelector("#gameover").innerHTML = "GAME OVER";
    document.querySelector("#score").innerHTML = "Your score: " + score;
    noLoop();

}