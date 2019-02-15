class Network
{
    constructor()
    {
        this.nodeSize = INPUT_SIZE;
        this.nodes = [];
        this.edges = [];
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
            if (Math.random() < 0.6) {
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
}