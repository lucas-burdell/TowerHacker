var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    parent: $("#content").get(0),
    canvas: $("#canvas").get(0)
};

var game = new Phaser.Game(config);

function preload ()
{
    //this.load.setBaseURL('http://labs.phaser.io');

    this.load.image('sky', 'assets/background.png');
    this.load.image('logo', 'assets/logo.png');
    this.load.image('one', 'assets/one.png');
    this.load.image('zero', 'assets/zero.png');
}

var emitter;
var emitter2;
var logo;
var startText;

function create ()
{
    this.add.image(400, 300, 'sky');

    var particles = this.add.particles('one');
    var particles2 = this.add.particles('zero');
    logo = this.physics.add.image(400, 100, 'logo');

    emitter = particles.createEmitter({
        speed: 100,
        frequency: 200,
        scale: { start: 1, end: 0 },
        blendMode: 'ADD',
        ignoreChildInput: true
    });



    emitter2 = particles2.createEmitter({
        speed: 100,
        frequency: 200,
        scale: {start: 1, end: 0},
        blendMode: 'ADD',
        ignoreChildInput: true
    });




    logo.setVelocity(100, 200);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);

    //emitter.startFollow(logo);
    //emitter2.startFollow(logo);

    emitter.height = 100;
    emitter.width = 400;
    emitter2.height = 100;
    emitter2.width = 400;

    startText = this.add.text(200, 400, "Press any key to start", {fill: "#FFFFFF"});
    startText.x = config.width/2 - startText.width / 2;
    startText.y = config.height*.75 - startText.width / 2;
}

function intRandom(min, max){
    if (min > max) {
        var temp = min;
        min = max;
        max = temp;
    }
    var range = (max - min);
    return (Math.floor(Math.random() * range)) + min;
}

var lastUpdate = 0;
var startUpdate = 0;

function update ()
{
    var deltaTime = 0;
    var newTime = (new Date()).getTime();
    if (lastUpdate != 0) {
        deltaTime = newTime - lastUpdate;
        lastUpdate = newTime;
    } else {
        startUpdate = newTime;
        lastUpdate = startUpdate;
    }
    emitter.setPosition(x = logo.x + intRandom(-200, 200), y = logo.y + intRandom(-50, 50));
    emitter2.setPosition(x = logo.x + intRandom(-200, 200), y = logo.y) + intRandom(-50, 50);
    console.log(newTime);
    startText.alpha = ((Math.sin(newTime / 500) + 1)  / 2) * .9 + .1;
    console.log(startText.opacity);
    //emitter.width = 400;
    //emitter.height = 100;
    //emitter2.width = 400;
    //emitter2.height = 100;

}