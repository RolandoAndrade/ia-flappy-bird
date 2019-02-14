ImageLoader.load();
const bg=new Background();
const player=new Player();
function gen()
{
    bg.generatePipe();
}
function loop()
{
    if(player.isAlive)
    {
        bg.draw();
        player.move();
        bg.collision(player);
        player.draw();
    }
}

document.onkeydown = function (e) {
    if(e.keyCode===38)
        player.fly();
};
window.setInterval(loop, 1000/20);
window.setInterval(gen, 2000);