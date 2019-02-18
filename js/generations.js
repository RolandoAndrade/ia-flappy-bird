class Generation
{
    constructor(players)
    {
        this.generation=1;
        for(let i=0;i<players.length;i++)
            players[i].mutate();
        this.survivors=Math.round(SURVIVOR_RATE*NUMBER_OF_PLAYERS);
    }

    nextGeneration(players)
    {
        this.players=players;
        this.players.sort(function(a, b) {return b.meters - a.meters});
        console.table(this.players);

        for (let i = 0; i < NUMBER_OF_PLAYERS-this.survivors; i++)
        {
            this.players.pop();
        }



        //Data.generation.SURVIVOR_NUM = Math.min(Data.generation.SURVIVOR_NUM, Data.generation.BIRD_NUM);
        for (let i = this.survivors; i < NUMBER_OF_PLAYERS; i++)
        {
            this.players.push(this.procreate(Math.floor(Math.random() * this.survivors), Math.floor(Math.random() * this.survivors)));
        }

        for (let i = 0; i<this.survivors; i++)
        {
            this.players[i].reset();
        }
        /*for (let i = 0; i < this.survivors; i++)
        {
            this.birds[i].init();
        }*/
        this.generation++;
        console.table(this.players);
        return this.players;
    }

    procreate(father, mother)
    {
        let baby = new Player();

        if (this.players[father].meters < this.players[mother].meters)
        {
            father^=mother^=father^=mother;
        }

        baby.DNA.nodeSize = this.players[father].DNA.nodeSize;
        for (let i = 1; i <= baby.DNA.nodeSize; i++)
        {
            baby.DNA.edges[i] = [];
            for (let j in this.players[father].DNA.edges[i])
            {
            // Check if the parent with less fitness has the same edge
                if (this.players[mother].DNA.edges.hasOwnProperty(i) &&
                    this.players[mother].DNA.edges[i].hasOwnProperty(j))
                {
                    baby.DNA.edges[i][j] = Math.random() < 0.5 ? this.players[father].DNA.edges[i][j] : this.players[mother].DNA.edges[i][j];
                }
                else
                {
                    baby.DNA.edges[i][j] = this.players[father].DNA.edges[i][j];
                }
            }
        }

        if (Math.random() <= MUTATION_RATE)
        {
            baby.DNA.mutate();
        }
        return baby;
    }


}