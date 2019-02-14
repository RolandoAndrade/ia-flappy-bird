class Land
{
    constructor(i)
    {
        this.x=i*WIDTH;
        this.y=HEIGHT-50;
        this.w=WIDTH;
        this.h=100;
    }

    draw()
    {
        ImageLoader.drawImage(FLOOR,this.x,this.y,this.w,this.h);
    }

    move(delta)
    {
        this.x-=delta;
        if(this.x<-this.w)
            this.x+=2*this.w;
    }

    collision(player)
    {
        if(player.y+PLAYER_RADIUS>=this.y)
            player.kill(this.y);
        else if(player.y<=0)
            player.kill(PLAYER_WIDTH);
        return !player.isAlive;
    }
}

class Pipe
{
    constructor(x,y,color)
    {
        this.x=x;
        this.y=y;
        this.w=52;
        this.h=500;
        this.color=color;
    }
    getColor()
    {
        if(this.color==="GREEN")
            return [GREEN_UP, GREEN_DOWN];
        return [RED_UP, RED_DOWN];
    }
    draw()
    {
        ImageLoader.drawImage(this.getColor(),this.x,this.y,this.w,this.h);
    }

    move(delta)
    {
        this.x-=delta;
        return this.x<-this.w;
    }

    verticalCollision(player)
    {
        return false;
    }

    collision(player)
    {
        if(this.x<=player.x+PLAYER_RADIUS&&player.x-PLAYER_RADIUS<=this.x+this.w&&this.verticalCollision(player))
            player.kill(player.y+PLAYER_RADIUS);
        return !player.isAlive;
    }
}

class TopPipe extends Pipe
{
    constructor(x,y,color)
    {
        super(x,y-500,color);

    }
    getColor()
    {
        return super.getColor()[1];
    }
    verticalCollision(player)
    {
        return this.y+this.h>=player.y-PLAYER_RADIUS;
    }
}

class BottomPipe extends Pipe
{
    getColor()
    {
        return super.getColor()[0];
    }
    verticalCollision(player)
    {
        return this.y<=player.y+PLAYER_RADIUS;
    }
}

class PairPipe
{
    constructor()
    {
        this.x=WIDTH;
        let y=this.random(150,450);
        let colors=["GREEN","R"];
        let r=this.random(0,2);
        this.top=new TopPipe(this.x,y-50,colors[r]);
        this.bottom=new BottomPipe(this.x,y+50,colors[r]);
        this.isPointed=false;
    }

    move(delta)
    {
        this.top.move(delta);
        return this.bottom.move(delta);
    }

    draw()
    {
        this.top.draw();
        this.bottom.draw();
    }

    random(min, max)
    {
        return Math.floor(Math.random() * (max - min))+min;
    }

    collision(player)
    {
        if(this.top.x<player.x-PLAYER_RADIUS)
        {
            if(!this.isPointed)
            {
                Score.point();
                this.isPointed=true;
            }
            return false;
        }
        return this.top.collision(player)||this.bottom.collision(player);
    }
}

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
                this.pipes[i].move(delta)
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

}