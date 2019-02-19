class Background
{
    constructor()
    {
        this.land=[new Land(0), new Land(1)];
        this.pipes=[];
        this.nextPipe;
    }

    generatePipe()
    {
        this.pipes.push(new PairPipe());
        if(this.pipes.length===1)
        {
            this.pipes[0].focus();
            this.nextPipe=this.pipes[0];
        }
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
            {
                this.pipes[1].focus();
                this.nextPipe=this.pipes[1];
            }
            else
            {
                this.pipes[2].focus();
                this.nextPipe=this.pipes[2];
            }

        }
        catch (e)
        {

        }


    }

    getNextPipes()
    {
        return this.nextPipe;
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
        this.loopTime=1000/20;
        this.pipesTime=2000;
        ImageLoader.load();
        this.players=[];
        for(let i=0;i<NUMBER_OF_PLAYERS;i++)
        {
            this.players.push(new Player());
        }
        this.generation=new Generation(this.players);
        this.restart();


        this.init();
        let a=this;
        document.onkeydown = function (e)
        {
            a.kill();
        };
    }


    restart()
    {
        window.clearInterval();
        this.background=new Background();
        Score.score=0;
    }

    gen()
    {
        this.background.generatePipe();
    }

    checkGameOver(gameOver)
    {
        if(gameOver)
        {
            this.players=this.generation.nextGeneration(this.players);
            this.restart();
        }


    }
    loop()
    {
        this.background.draw();
        let gameOver=true;
        let next=this.background.getNextPipes();
        for(let i=0;i<this.players.length;i++)
        {
            this.players[i].fly(next);
            this.players[i].move();
            this.background.collision(this.players[i]);
            this.players[i].draw();

            if(this.players[i].isAlive)
                gameOver=false;
        }
        Score.draw();
        this.checkGameOver(gameOver);
    }
    clearTime()
    {
        window.clearInterval(this.loopInterval);
        window.clearInterval(this.pipeInterval);
    }

    setTime(x)
    {
        this.clearTime();
        this.loopTime/=x;
        this.pipesTime/=x;
        this.init();
    }

    kill()
    {
        for(let i=0;i<this.players.length;i++)
            this.players[i].kill(0);
    }

    init()
    {
        this.loopInterval=window.setInterval(this.loop.bind(this), this.loopTime/5);
        this.pipeInterval=window.setInterval(this.gen.bind(this), this.pipesTime/5);
    }
}