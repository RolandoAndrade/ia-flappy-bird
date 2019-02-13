const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");
const WIDTH=400;
const HEIGHT=600;

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
}


class Background
{
    constructor()
    {
        this.land=[new Land(0), new Land(1)];
    }

    scroll(delta)
    {
        this.land[0].move(delta);
        this.land[1].move(delta);
    }

    draw()
    {
        ImageLoader.drawImage(BG_DAY,0,0,WIDTH,HEIGHT);
        this.scroll(5);
        this.land[0].draw();
        this.land[1].draw();
    }
}

class Player
{

}

class Game
{

}