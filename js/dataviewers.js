const canvasGenerations=document.getElementById("generations");
const ctx2=canvasGenerations.getContext("2d");
const SMALL_WIDTH=200;


class GenerationViewer
{
    static draw(players, max)
    {

        let w=SMALL_WIDTH/NUMBER_OF_PLAYERS;
        ctx2.fillStyle="#fff";
        ctx2.fillRect(0,0,SMALL_WIDTH,SMALL_WIDTH);
        ctx2.fillStyle="#a788b6";

        GenerationViewer.generation=GenerationViewer.generation?GenerationViewer.generation:1;
        ctx2.font = "150px Arial";
        ctx2.textAlign = "center";
        ctx2.fillText(GenerationViewer.generation++, 100, 150);
        for(let i=0;i<players.length;i++)
        {
            ctx2.fillStyle="rgba(111,48,182,"+Math.max(players[i].meters/max,0.3)+")";
            ctx2.fillRect(i*w,SMALL_WIDTH-SMALL_WIDTH*players[i].meters/max,w,SMALL_WIDTH);
        }
    }
}