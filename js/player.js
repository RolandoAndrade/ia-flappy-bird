class Player
{
    constructor()
    {
        this.w=PLAYER_WIDTH;
        this.h=PLAYER_WIDTH;
        this.x=PLAYER_INIT_X;
        this.y=PLAYER_INIT_Y;
        this.isAlive=true;
        this.speed=0;
    }

    fly()
    {
        this.speed=FLY_SPEED;
    }

    move()
    {
        this.y+=this.speed;
        this.speed+=GRAVITY;
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

    collision(x,y,w,h)
    {
        let minX=this.x-PLAYER_RADIUS;
        let maxX=this.x+PLAYER_RADIUS;
        let minY=this.y-PLAYER_RADIUS;
        let maxY=this.y+PLAYER_RADIUS;
        return minX<=x&&x<=maxX&&minY<=y&&y<=maxY;
    }
}