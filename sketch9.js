let bubbles_removed = 0;
let bubbles = new Array(130);
let count = bubbles.length;

let bubbleNum;

let bubblePop;
let backgroundMusic;

function preload()
{
    bubblePop = loadSound('pop.wav');
    backgroundMusic = loadSound('bg_music.mp3')
}

function setup()
{
    let message = "You will have 60 seconds to remove as many bubbles as you can!\n"
    message+= "To remove a bubble just click on it!\n"
    message+="Hint: It is possible for you to remove a cluster of bubbles (i.e. more than 1) depending on where you click!"
    alert(message)

    createCanvas(windowWidth, windowHeight)

    for (let i = 0; i < bubbles.length; i++)
    {
        bubbles[i] = new Bubble(random(width), random(height))
    }

    bubbleNum = select("#bubbleCount")
    bubbleNum.position(width/2, 0)

    bubblePop.setVolume(1.0)

    document.getElementById("bubbleCount").innerHTML = "Bubbles: " + bubbles.length;

    ellipseMode(RADIUS)

    setTimeout(endGame, 60000);

    playMusic();
}

function draw()
{
    background(255,20,147)
    for (let i = 0; i < bubbles.length; i++)
    {
        bubbles[i].display()
        bubbles[i].move()
    }
}

function mousePressed()
{
    for (let i = 0; i < bubbles.length; i++)
    {
        if (bubbles[i].isClicked(mouseX, mouseY)==true)
        {
            bubbles.splice(i, 1)
            bubblePop.play()
            decreaseCount();
            bubbles_removed++;
        }
    }
}

function decreaseCount()
{
    if (count > 0)
    {
        --count;
        document.getElementById("bubbleCount").innerHTML = "Bubbles: " + count;
    }
}

function endGame()
{
    backgroundMusic.stop();
    
    alert("Time's up!\n")
    alert("You popped " + bubbles_removed + " bubbles!")

    noLoop()
    
    window.close()
}

function playMusic()
{
    backgroundMusic.setVolume(0.25)
    
    if (backgroundMusic.isLoaded())
        backgroundMusic.play()

    if (!backgroundMusic.isPlaying())
    {
        backgroundMusic.play()
    }
}