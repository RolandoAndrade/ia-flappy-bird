class Background
{
    constructor()
    {
        this.land=[new Land(0), new Land(1)];
        this.pipes=[];
    }

    generatePipe()
    {
        this.pipes.push(new PairPipe());
        if(this.pipes.length===1)
            this.pipes[0].focus();
    }

    scroll(delta)
    {
        try
        {
            this.land[0].move(delta);
            this.land[1].move(delta);

            if(this.pipes[0].move(delta))
                this.pipes.shift();

            for(let i=1;i<this.pipes.length;i++)
                this.pipes[i].move(delta);

            if(this.pipes[0].isPointed&&!this.pipes[1].isPointed)
                this.pipes[1].focus();
            else
                this.pipes[2].focus();
        }
        catch (e)
        {

        }


    }

    draw()
    {
        ImageLoader.drawImage(BG_DAY,0,0,WIDTH,HEIGHT);
        this.scroll(5);
        for(let i=0;i<this.pipes.length;i++)
            this.pipes[i].draw();
        this.land[0].draw();
        this.land[1].draw();
    }

    collision(player)
    {
        try
        {
            return this.land[0].collision(player)||this.land[1].collision(player)||this.pipes[0].collision(player)
                ||this.pipes[1].collision(player);
        }catch (e)
        {
            return false;
        }

    }

}

class Game
{
    constructor()
    {
        ImageLoader.load();
        this.background=new Background();
        this.players=[];
        for(let i=0;i<10;i++)
        {
            this.players.push(new Player());
        }
        //this.player=new Player();
        this.init();
    }
    gen()
    {
        this.background.generatePipe();
    }

    loop()
    {
        this.background.draw();
        //this.player.move();
        //this.background.collision(this.player);
        for(let i=0;i<this.players.length;i++)
        {
            this.players[i].move();
            this.background.collision(this.players[i]);
            this.players[i].draw();
        }

        //this.player.draw();
        Score.draw();
    }

    init()
    {
        window.clearInterval();
        window.setInterval(this.loop.bind(this), 1000/20);
        window.setInterval(this.gen.bind(this), 2000);
    }
}