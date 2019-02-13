ImageLoader.load();
const bg=new Background();

function loop()
{
    bg.draw();
}

window.setInterval(loop, 1000/20);