class Score
{
    static point()
    {
        if(!Score.score)
            Score.score=0;
        Score.score++;
    }

    static draw()
    {
        if(!Score.score)
            Score.score=0;

        let d=parseInt(Math.log10(Score.score)+1)||1;
        let x=WIDTH/2+SCORE_WIDTH/2*(d-1)-SCORE_WIDTH/2;
        let s=Score.score;
        while(d>0)
        {
            ImageLoader.drawImage(NUMBERS_IMAGES[s%10],x,50,SCORE_WIDTH,SCORE_HEIGHT);
            x-=SCORE_WIDTH;
            s=Math.trunc(s/10);
            d--;
        }

    }
}