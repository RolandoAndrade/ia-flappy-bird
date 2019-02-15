class Generation
{
    constructor(players)
    {
        this.generation=1;
        for(let p in players)
            p.brain.mutate();
        this.players=players;
        this.survivors=Math.round(SURVIVOR_RATE*BIRD_NUM);
    }

    nextGeneration()
    {
        this.players.sort(function(a, b) {return b.meters - a.meters});

        for (let i = 0; i < BIRD_NUM-this.survivors; i++)
        {
            this.players.pop();
        }

        /*for (let i = this.survivors - 1; i >= BIRD_NUM; i--)
        {
        this.birds[i] = null;
        delete this.birds[i];
        }*/

        //Data.generation.SURVIVOR_NUM = Math.min(Data.generation.SURVIVOR_NUM, Data.generation.BIRD_NUM);
        for (let i = this.survivors; i < BIRD_NUM; i++)
        {
            this.players[i] = this.procreate(Math.floor(Math.random() * this.survivors), Math.floor(Math.random() * this.survivors));
        }
        /*for (let i = 0; i < this.survivors; i++)
        {
            this.birds[i].init();
        }*/
        this.generation++;
    }

    procreate(father, mother)
    {
        let baby = new Player();

        if (this.players[father].meters < this.players[mother].meters)
        {
            father^=mother^=father^=mother;
        }

        baby.brain.nodeSize = this.players[father].brain.nodeSize;
        for (let i = 1; i <= baby.brain.nodeSize; i++)
        {
            baby.brain.edges[i] = [];
            for (let j in this.players[father].brain.edges[i])
            {
            // Check if the parent with less fitness has the same edge
                if (this.players[mother].brain.edges.hasOwnProperty(i) &&
                    this.players[mother].brain.edges[i].hasOwnProperty(j))
                {
                    baby.brain.edges[i][j] = Math.random() < 0.5 ? this.players[father].brain.edges[i][j] : this.players[mother].brain.edges[i][j];
                }
                else
                {
                    baby.brain.edges[i][j] = this.players[father].brain.edges[i][j];
                }
            }
        }

        if (Math.random() <= MUTATION_RATE)
        {
            baby.brain.mutate();
        }
        return baby;
    }


}