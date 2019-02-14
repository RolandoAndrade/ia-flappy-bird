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
