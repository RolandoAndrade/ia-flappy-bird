class ActivationFunction
{
    activate(x)
    {
        return x;
    }
}
class Sigmoid extends ActivationFunction
{
    activate(x)
    {
        return 1 / (1 + Math.exp(-x));
    }
}

class Arctan extends ActivationFunction
{
    activate(x)
    {
        return 1 / (Math.pow(x, 2) + 1);
    }
}

class DroppedTan extends ActivationFunction
{
    activate(x)
    {
        return 2/(1+Math.exp(-4.9*x)-1)
    }
}

class TanH extends ActivationFunction
{
    activate(x)
    {
        return 1 / (1 + Math.exp(-2 * x));
    }
}

class Relu extends ActivationFunction
{
    activate(x)
    {
        return Math.max(0, x);
    }
}