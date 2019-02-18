class Player
{
    constructor()
    {
        this.DNA=new NeuronalNetwork();


        this.w=PLAYER_WIDTH;
        this.h=PLAYER_WIDTH;
        this.reset();
        /*let a=this;
        document.onkeydown = function (e) {
            if(e.keyCode===38)
                a.fly();
        };
        document.onclick = function () {
            a.fly();
        };*/
    }

    reset()
    {
        this.x=PLAYER_INIT_X;
        this.y=PLAYER_INIT_Y;
        this.meters=0;
        this.isAlive=true;
        this.speed=0;
    }

    fly(pipe)
    {
        if(this.isAlive)
        {
            if(this.DNA.getOutput(pipe,this))
                this.speed=FLY_SPEED;
        }

    }

    move()
    {
        if (this.isAlive)
        {
            this.meters++;
            this.y += this.speed;
            this.speed += GRAVITY;
        }
        else
            this.x+=SCROLL_SPEED;
    }

    draw()
    {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(Math.min(this.speed*3, 90) * Math.PI / 180);
        ctx.drawImage(ImageLoader.getImage(BIRD_YELLOW),-this.w,-this.h);
        ctx.restore();
    }

    kill(y)
    {
        this.isAlive=false;
        this.y=y-PLAYER_RADIUS;
    }

    mutate()
    {
        this.DNA.mutate();
    }
}