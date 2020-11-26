# Generative Type Experiment

This was an early tryout when my concept was not clear to me yet. It explores how design can be generative and react to its user.

[](https://github.com/moritzsalla/tactile-poster)

[Tactile Posters](https://tactile-poster.vercel.app/)

### Interactive posters using posenet and variable fonts

Digital posters, such as the ones at train stations, provide lots of interactive potential.

Using generative design, as opposed to static graphic and motion design, could open up the doors to more human centered design. 

For instance, a billboard in the central station could display other designs based on to the time of day, visitor count, temperature, you name it.

Surely, the data used to drive generative solutions would need to be regulated, as it leaves the doors open for companies to optimise their ads for profit. 

However, there are many positive use cases one could imagine, as showing COVID "keep-your-distance" notices once visitor count increases beyond acceptable measures. Or creating pedestrian underpasses that will adapt their ambient lighting hue and brightness to minimize criminality. The Willem Passage in Tilburg does just that.

[https://www.instagram.com/p/Bsx6AhVhlNf/](https://www.instagram.com/p/Bsx6AhVhlNf/)

In 2019, the dutch railway company and design studio Dumbar collaborated in turning all advertising boards at the Amsterdam central station into a motion design festival.

![Generative%20Type%20Experiment%20d1f2a0939eec402fadc614378dd1b988/Untitled.png](Generative%20Type%20Experiment%20d1f2a0939eec402fadc614378dd1b988/Untitled.png)

RNDR — Willem II passage

> Technology, social security and atmosphere reinforced in an architectural design. Can technology, social security and atmosphere reinforce each other in an architectural design?

### **I set out to create a poster that would adapt to it's viewer.**

As opposed to drawing shapes to the canvas, I was interested in manipulating variable fonts. Although this technology has existed for longer, it's really starting to shake up web development as browsers are adding support.

Traditionally, when a designer wishes to use several versions of a typeface (say bold and italic), he or she would need to purchase both files. Variable fonts are single files that aren't statically set to a certain thickness, slant or wideness, but are dynamically generated along set axis. This allows for endless variations and smooth transitions between states. 

[https://vimeo.com/315444112](https://vimeo.com/315444112)

My experiment is built using Posenet and P5js. Through the keyframe values derived from posenet's skeleton tracking, I am able to control the font feature settings on the variable font. It's not exactly a poster, but it illustrates the basic interplay of gesture driven interfaces and graphic design. 

Combining gesture driven and graphical user interfaces

![Generative%20Type%20Experiment%20d1f2a0939eec402fadc614378dd1b988/pflaumenessig.jpeg](Generative%20Type%20Experiment%20d1f2a0939eec402fadc614378dd1b988/pflaumenessig.jpeg)

![Generative%20Type%20Experiment%20d1f2a0939eec402fadc614378dd1b988/pflaumenessig_1.jpeg](Generative%20Type%20Experiment%20d1f2a0939eec402fadc614378dd1b988/pflaumenessig_1.jpeg)

[Generative%20Type%20Experiment%20d1f2a0939eec402fadc614378dd1b988/tactile-interfaces.mov](Generative%20Type%20Experiment%20d1f2a0939eec402fadc614378dd1b988/tactile-interfaces.mov)

Top: weight, center: width, bottom: slant (italic)

## Related Projects

### Camera Postura

[Camera Postura](https://rndr.studio/projects/camera-postura/)

![https://i.vimeocdn.com/video/753628443_640.jpg](https://i.vimeocdn.com/video/753628443_640.jpg)

> Film, by definition, is linear, the narrative unfolds itself over time. However, using motion tracking methods we can introduce a new way to interact with film-based footage. Rather than surrendering to the screen as a passive viewer, users can penetrate an archive of movies from a new perspective. This subversion of the traditional film/viewer relationship brings unexpected juxtapositions and a more engaging interaction.

### Open Highway

This is another beautiful example of data driven design I found from the design studio RNDR. In this project, they use traffic data (I believe through the government) to visualise traffic congestion in an underground tunnel. This is similar to my experiment, in that it uses real time data to manipulate design. Yet it differs in that the tunnel is not an interface (or is it?) with which users directly interact.

[https://player.vimeo.com/video/315246493?loop=1&background=1&app_id=122963](https://player.vimeo.com/video/315246493?loop=1&background=1&app_id=122963)

RNDR — Open Highway, Utrecht

![https://www.datocms-assets.com/8504/1547653529-poster-print-02.jpg?auto=format&fit=crop&ar=&ixlib=react-8.5.1&w=3524](https://www.datocms-assets.com/8504/1547653529-poster-print-02.jpg?auto=format&fit=crop&ar=&ixlib=react-8.5.1&w=3524)

Visualisation derived from traffic data