# Testing RunwayML

Goal of this is to examine Runway's potential and see if it could become a valid platform for my project.

## StyleGAN trained on Material Design GUI

I find the latent space GUI below both interesting and underwhelming. **If a computer could create it's own interfaces, what would they be? Could the computer ever set itself free from human design, or would it always need to base it's generated designs on existing datasets and systems?** 

If a computer could create it's own interfaces, what would they be?

On the contrary, this latent space video is purely artistic — the interface is unusable at any moment (excluding when it replicates an image in the dataset). I'm not sure which architecture was used for this, perhaps a styleGAN, but I wonder if a pGAN could create more valuable GUIs. 

Can latent space GUIs ever be useable?

[Testing%20RunwayML%2009b94291395c42db935d5bade18505db/Android_App_styleGAN_-_Generate_Interpolation_Video.mp4](Testing%20RunwayML%2009b94291395c42db935d5bade18505db/Android_App_styleGAN_-_Generate_Interpolation_Video.mp4)

stylegan - android interface

## VitraGAN

Vitra is a Swiss family-owned furniture company with headquarters in Switzerland (similar to Herman Miller). They also own a design museum with the worlds most iconic furniture. In theory, on could argue that the objects in Vitra's collection are a representation of humanities (its probably more accurate to say the western world's) best furniture design?

For a moment I will argue that chairs (the supreme discipline for every furniture designer) are an interface, just like Don Norman argues that doors are interfaces, too. We interact with them on daily basis and they are meant to please the eye and the body. Some do this better than others. In theory, Vitra's collection does it best.

**What happens if I train a GAN on Vitra's collection? Are the computers designs a representation of good design in itself? Perhaps even a distilled image of how chairs have evolved into their best optimised form?**

When does the output of a GAN say about it's dataset? Can it be seen as the average, since features present at higher quantities in the dataset will be more present in the models outputs?

![Testing%20RunwayML%2009b94291395c42db935d5bade18505db/vitra.jpg](Testing%20RunwayML%2009b94291395c42db935d5bade18505db/vitra.jpg)

What would Don Norman say? "Art, not design." Probably.

[Testing%20RunwayML%2009b94291395c42db935d5bade18505db/Vitra-Chairs_-_Generate_Interpolation_Video.mp4](Testing%20RunwayML%2009b94291395c42db935d5bade18505db/Vitra-Chairs_-_Generate_Interpolation_Video.mp4)

Latent space

![Testing%20RunwayML%2009b94291395c42db935d5bade18505db/img000000007.jpg](Testing%20RunwayML%2009b94291395c42db935d5bade18505db/img000000007.jpg)

![Testing%20RunwayML%2009b94291395c42db935d5bade18505db/img000000021.jpg](Testing%20RunwayML%2009b94291395c42db935d5bade18505db/img000000021.jpg)

![Testing%20RunwayML%2009b94291395c42db935d5bade18505db/img000000011.jpg](Testing%20RunwayML%2009b94291395c42db935d5bade18505db/img000000011.jpg)

![Testing%20RunwayML%2009b94291395c42db935d5bade18505db/img000000017.jpg](Testing%20RunwayML%2009b94291395c42db935d5bade18505db/img000000017.jpg)

![Testing%20RunwayML%2009b94291395c42db935d5bade18505db/img000000049.jpg](Testing%20RunwayML%2009b94291395c42db935d5bade18505db/img000000049.jpg)

![Testing%20RunwayML%2009b94291395c42db935d5bade18505db/img000000018.jpg](Testing%20RunwayML%2009b94291395c42db935d5bade18505db/img000000018.jpg)

![Testing%20RunwayML%2009b94291395c42db935d5bade18505db/img000000035.jpg](Testing%20RunwayML%2009b94291395c42db935d5bade18505db/img000000035.jpg)

Just like the GUI up top, these chairs are interesting form an artistic standpoint, but they do not adhere to any design rules, nor are they meant to have purpose. Perhaps I am using the wrong architecture?

Apparently this has been done before, as illustrated by the instagram embeds below. The maker does not explicitly state which architecture was used to perceive these chairs. I suspect it is a styleGAN as well, as these shapes are a little unlike real chairs.

[https://www.instagram.com/p/CBWlKJ_IVRz/](https://www.instagram.com/p/CBWlKJ_IVRz/)

[https://www.instagram.com/p/CBYFd9vo-kD/](https://www.instagram.com/p/CBYFd9vo-kD/)

I've trained a StyleGAN on an existing model. **Can I train a PGAN on Runway?**