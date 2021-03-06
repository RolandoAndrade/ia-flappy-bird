class NeuronalNetwork
{
    constructor()
    {
        this.nodeSize = INPUT_SIZE;
        this.nodes = [];
        this.edges = [];
        this.activationFuntion=new Relu();
    }

    activate(x)
    {
        return this.activationFuntion.activate(x);
    }

    addNode(startNode, endNode)
    {
        this.edges[startNode][this.nodeSize++] = 1;
        this.edges[this.nodeSize] = this.edges[this.nodeSize] || [];
        this.edges[this.nodeSize][endNode] = this.edges[startNode][endNode];
        this.edges[startNode][endNode] = 0;
    }

    changeEdgeWeight(startNode, endNode)
    {
        this.edges[startNode][endNode] += Math.random() * STEP_SIZE * 2 - STEP_SIZE;
    }

    addEdge(startNode, endNode)
    {
        this.edges[startNode] = this.edges[startNode] || [];
        this.edges[startNode][endNode] = Math.random() * 2 - 1;
    }

    mutate()
    {
        let startNode = Math.ceil(Math.random() * this.nodeSize);
        let endNode = Math.ceil(Math.random()*(this.nodeSize+1-INPUT_SIZE)) + INPUT_SIZE;
        if (endNode > this.nodeSize)
        {
            endNode = NODE_OUTPUT;
        }
        if (startNode > endNode && endNode !== 0)
        {
            startNode^=endNode^=startNode^=endNode;
        }

        // Check whether the two nodes are linked or not
        if (this.edges.hasOwnProperty(startNode) && this.edges[startNode].hasOwnProperty(endNode))
        {
            if (Math.random() < NEW_NODE_RATE) {
                this.addNode(startNode, endNode);
            } else {
                this.changeEdgeWeight(startNode, endNode);
            }
        }
        else
        {
            this.addEdge(startNode, endNode);
        }
    }
    getOutput(pipe, player)
    {
    // Initialize the value of nodes
        this.nodes[NODE_BIAS] = 1;
        this.nodes[NODE_OUTPUT] = 0;
        try
        {
            this.nodes[NODE_PIPE_DISTANCE] = pipe.x-player.x;
            this.nodes[NODE_PIPE_UPPER] = (pipe.y-player.y)/HEIGHT;
        }
        catch (e)
        {
            this.nodes[NODE_PIPE_DISTANCE] = WIDTH/2-player.x;
            this.nodes[NODE_PIPE_UPPER] = (HEIGHT/2-player.y+PLAYER_RADIUS)/HEIGHT;
        }
        for (let i = INPUT_SIZE; i < this.nodeSize; i++)
        {
            this.nodes[i] = 0;
        }

        for (let i = 1; i <= this.nodeSize; i++)
        {
            if (i > INPUT_SIZE)
            {
                this.nodes[i] = this.activate(this.nodes[i]);
            }
            for (let j in this.edges[i])
            {
                this.nodes[j] += this.nodes[i] * this.edges[i][j];
            }
        }
        return this.nodes[NODE_OUTPUT] > 0;
    }

}

/*edges: Array(5)
1: [-0.027244421867331337]
2: []
3: [-0.6778135929440219]
4: []
length: 5
__proto__: Array(0)
nodeSize: 4
nodes: Array(4)
0: -0.0396710044046384
1: 1
2: 121
3: 0.018333333333333333
length: 4
__proto__: Array(0)
__proto__: Object*/