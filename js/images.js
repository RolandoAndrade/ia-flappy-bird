const IMAGES=["bgNight","bgDay", "land", "pipeUp", "pipeDown",
    "pipeRedUp", "pipeRedDown", "birdRed0", "birdBlue0", "birdYellow0",
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];


const BG_NIGHT=0;
const BG_DAY=1;
const FLOOR=2;
const GREEN_UP=3;
const GREEN_DOWN=4;
const RED_UP=5;
const RED_DOWN=6;

class ImageLoader
{
    static load()
    {
        ImageLoader.images=[];
        for(let i=0;i<IMAGES.length;i++)
        {
            let img=new Image();
            img.src="img/"+IMAGES[i]+".png";
            ImageLoader.images.push(img);
        }
    }
    static getImage(image)
    {
        return ImageLoader.images[image];
    }
    static drawImage(image,x,y,width,height)
    {
        ctx.drawImage(ImageLoader.getImage(image),x,y,width,height);
    }
}
