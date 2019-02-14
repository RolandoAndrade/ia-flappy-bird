class Score
{
    static point()
    {
        if(!Score.score)
            Score.score=0;
        Score.score+=99;
    }

    static draw()
    {
        if(!Score.score)
            Score.score=0;

        let d=parseInt(Math.log10(Score.score)+1)||1;
        let x=WIDTH/2+12*(d-1)-12;
        let s=Score.score;
        while(d>0)
        {
            ImageLoader.drawImage(NUMBERS_IMAGES[s%10],x,50,SCORE_WIDTH,SCORE_HEIGHT);
            x-=24;
            s=Math.trunc(s/10);
            d--;
        }

    }
}