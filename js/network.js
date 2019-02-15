class NeuronalNetwork
{
    constructor()
    {
        this.nodeSize = INPUT_SIZE;
        this.nodes = [];
        this.edges = [];
        this.activationFuntion=new DroppedTan();
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
    getOutput(pipeDistance, firstPipe, secondPipe)
    {
    // Initialize the value of nodes
        this.nodes[NODE_BIAS] = 1;
        this.nodes[NODE_PIPE_DISTANCE] = pipeDistance;
        this.nodes[NODE_PIPE_UPPER] = firstPipe;
        this.nodes[NODE_PIPE2_UPPER] = secondPipe;
        this.nodes[NODE_OUTPUT] = 0;
        for (let i = INPUT_SIZE + 1; i <= this.nodeSize; i++)
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