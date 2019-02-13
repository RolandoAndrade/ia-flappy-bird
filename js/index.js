ImageLoader.load();
const bg=new Background();

function gen()
{
    bg.generatePipe();
}
function loop()
{
    bg.draw();
}

window.setInterval(loop, 1000/20);
window.setInterval(gen, 2000);