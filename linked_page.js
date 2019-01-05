
//hide play again buttons

function hideButtons(){
  document.getElementById("playAgain").style.display = "none";
}

hideButtons()








//my words will be colors and presidents
var colors = ["pink","indigo","amber","bronze","black","beige","green","copper","gold","gray"]

var presidents = ["kennedy","roosevelt","adams","monroe","madison","buren","tyler","polk","fillmore","buchanan"]
var animals = ["rhinocerous", "piranha","buffalo","eagle","lynx","polecat","badger","sheep","parrot"]
var big_list = colors.concat(presidents);
var big_list = big_list.concat(animals);
//var big_list = big_list.concat(animals);
console.log("big list",big_list)


//get the category from the query string submitted by the previous page

the_list = []
category = ""



queryString = window.location.search;
console.log("this is the query string "+ queryString)  
query = queryString.substring(1);
query = decodeURIComponent(query);
categories = query.split("=");
console.log("categories[0] "+categories[0])
if (categories[0] == "Presidents"){
  the_list =presidents
  category = "Presidents"
}
if (categories[0] == "Animals"){
  the_list = animals
  category = "Animals"
}
if (categories[0] == "Colors"){
  the_list = colors  
  category = "Colors"
}

 
  


console.log("37 from the other pagethe_list "+the_list)


//need to make a function to randomly select the word from word list
function pickIndex(){
  index = Math.floor(Math.random() * (the_list.length));
  return index
}



the_index = pickIndex()
the_word = the_list[the_index]
removeWord()

if (the_word === undefined) {
    the_word = "gray" ;
    the_list = animals
    removeWord()
}





console.log("the_word"+the_word+"length"+the_word.length)

//remove the chosen word from the appropriate list and also from the big list
function removeWord(){
  the_list.splice((the_list.indexOf(the_word)),1)
  big_list.splice((big_list.indexOf(the_word)),1)
  console.log("63list "+the_list + "big_list "+big_list)
}










//draw the hanging block canvas
var canvas = document.getElementById("firstCanvas");
var c1 = canvas.getContext("2d");
//c1.style.background = "red";

//big bottom block
c1.fillRect(((725/2)-150),280,300,60);
//vertical extending post
c1.fillRect(((725/2)-100),50,10,250);
//horizontal extending post
c1.fillRect(((725/2)-100),20,180,30);
//vertical post to hang from
c1.fillRect(420,20,10,70);


//draw the filling in letters canvas

var c = document.getElementById("myCanvas");
var c = c.getContext("2d");


/*  will draw as many lines as the length of the word (in a div 
that is right under the alphabet letters) */


 

function drawLines(word){
var w= 0
var x= 100
var y=30
var z=100
var i;
  console.log("word passed in"+ word)
  console.log("word length"+word.length+"word"+word)
  for (i = 0; i < word.length; i++){
      
      c.beginPath();
      c.moveTo(w, x);
      c.lineTo(y, z);
      c.stroke(); 
      console.log("one the way up") 
        w+= 40
        y+= 40
  }
} 
function clearLines(word){
  c.clearRect(0, 0, canvas.width, canvas.height);
}



//places correct letters on the appropriate drawn line
//this function also draws hangman when incorrect letters are chosen




strikes = 5
correct_words = 0
letters_written = 0
already_picked_letters = []
solvedWords


//function will write the letter in the appropriate location when called
function writeLetter(letters,i){
  c.font = "30px Arial";
  var x = (0+ 30*i+ 10*i) ;
  console.log("the letter is here!!")
  c.fillText(letters,x, 96 );  
}


//function keeps track of guesses and total words solved
function writeLetters(letter){
  //check to see whether the letter has already been picked
  var i;
  console.log("picked letters",already_picked_letters)
  var letter_present = false
  console.log("letter"+letter)
  console.log("strikes"+strikes)


  

  
  
  //check to ensure the letter button has not already been pushed before executing this code
  console.log("index of letter "+already_picked_letters.indexOf(letter))
  if (already_picked_letters.indexOf(letter)==-1) {
   already_picked_letters.push(letter) 
   console.log("hadn't clicked this guy before")
   //check the each letter of the word to see whether the picked letter is there
   for (i = 0; i < the_word.length; i++){
    if ((String(letter)).toLowerCase() === the_word[i] ){
      //console.log("158the letter matches")
      writeLetter(letter,i)
      letter_present = true
      letters_written +=1
      console.log("185score "+score)
      updateScore()
      doStorage()
      
    
    }
   }
    
     
 
    /*checks to see how many correct words have been selected:
    and if it's 3, it changes the list, if it's five, it becomes open category */
    
    
    if (letter_present == true){
      //reset timer, clear strikes and undraw man if only 2 or less words have been guessed
      
      if(letters_written == the_word.length && correct_words < 3 ){
        clearTimeout(timerId)
        doTimer(60)
        //reset timer, clear lines from previous word, pick a new word, and draw lines for new word

        
        document.getElementById("youlost").innerHTML = "Great job! You saved him. Next Word!"
        clearMessage()
        console.log("185theword"+the_word)
        clearLines(the_word)
        var an_index = pickIndex()
        console.log("224an index" + an_index)
        console.log("the_list "+the_list)
        the_word = the_list[index]
        //make sure the word doesn't reappear later
        removeWord()
        
        console.log("225the_word "+the_word)
        drawLines(the_word)
        correct_words += 1
        doCorrectWords()

        //reset strikes, letters_written, and picked letters list
        strikes = 5 
        doStrikes(5)
        letters_written = 0
        already_picked_letters = []
         

        //clear the hangman image
        c1.beginPath();
        c1.fillStyle="lightblue";
        c1.rect(410,89,50,170); 
        c1.fill();
        return

      }
    
      
      
      //if third word correctly guessed, pick new category and give alert, clear strikes and undraw man
      
      if(letters_written == the_word.length && correct_words == 3 ){
        // update difficulty level and corresponding points

        
        globalDifficulty = "Intermediate"
        doDifficulty()
        document.getElementById("youlost").innerHTML = "Great Job! Let's Bump it Up a notch. Each letter is worth 3 points, and we'll pick the category. Welcome to Intermediate stage."
        clearMessage()
        //pick new word list
        picks = Math.floor(Math.random() * 4)
        if(picks ==0 && the_list != animals){
          the_list = animals
          doCategory("Animals")
        }
        else{
          the_list = presidents
          doCategory("Presidents")
           }

        if(picks ==0 && the_list != presidents){
          the_list = presidents
          doCategory("Presidents")
        }
        else{
          the_list = colors
          doCategory("Colors")
          }

        if(picks ==0 && the_list != colors){
          the_list = colors
          doCategory("Colors")
        }
        else{
          the_list = animals
          doCategory("Animals")
          } 

        
        //reset timer, clear lines from previous word, pick a new word, and draw lines for new word

        clearTimeout(timerId)
        doTimer(60)
        
        clearLines(the_word)
        var an_index = pickIndex()
        console.log("271an index" + an_index)
        console.log("the_list "+the_list)
        the_word = the_list[index]
        //make sure the word doesn't reappear 
        removeWord()
        
        console.log("274the_word "+the_word)
        drawLines(the_word)
        correct_words += 1
        doCorrectWords()

        //reset strikes, letters_written, and picked letters list
        strikes = 5 
        doStrikes(5)
        letters_written = 0
        already_picked_letters = []
         
        //clear the hangman image
        c1.beginPath();
        c1.fillStyle="lightblue";
        c1.rect(410,89,50,170); 
        c1.fill();
        return 
        
      } 


      if(letters_written == the_word.length && correct_words == 4 ){
        //reset timer, clear lines from previous word, pick a new word, and draw lines for new word

        clearTimeout(timerId)
        doTimer(60)
        
        clearLines(the_word)
        var an_index = pickIndex()
        console.log("271an index" + an_index)
        console.log("the_list "+the_list)
        the_word = the_list[index]
        //make sure the word doesn't reappear
        removeWord()

        console.log("274the_word "+the_word)
        drawLines(the_word)
        correct_words += 1
        doCorrectWords()

        //reset strikes, letters_written, and picked letters list
        strikes = 5 
        doStrikes(5)
        letters_written = 0
        already_picked_letters = []

        //clear the hangman image
        c1.beginPath();
        c1.fillStyle="lightblue";
        c1.rect(410,89,50,170); 
        c1.fill();
        return

      }

      //if fifth word correctly filled, mix all the categories and give alert, clear strikes and undraw man
      if(letters_written == the_word.length && correct_words >= 5 ){
        
        //clear the hangman image
        c1.beginPath();
        c1.fillStyle="lightblue";
        c1.rect(410,89,50,170); 
        c1.fill();
        

        // then update difficulty level
        if(correct_words == 5){
          globalDifficulty = "Difficult"
          doDifficulty()
          document.getElementById("youlost").innerHTML = "Great Job! Let's Bump it Up a notch. Each letter is worth 5 points, and we're playing open category. Welcome to Hard stage."
          clearMessage()

          the_list = big_list
          doCategory("Open; Colors, Animals, and Presidents")
        } 
        
        //reset timer, clear lines from previous word, pick a new word, and draw lines for new word

        clearTimeout(timerId)
        doTimer(60)
        
        clearLines(the_word)
        var an_index = pickIndex()
        console.log("271an index" + an_index)
        console.log("the_list "+the_list)
        the_word = the_list[index]
        removeWord()
        
        console.log("334the_word "+the_word)
        drawLines(the_word)
        correct_words += 1
        doCorrectWords()

        //reset strikes, letters_written, and picked letters list
        strikes = 5 
        doStrikes(5)
        letters_written = 0
        already_picked_letters = []


      return
       }
    
     }
    
    //otherwise draw the hangman  parts for each respective strike 
    
    console.log("286strikes", strikes)
    if(strikes == 5 && letter_present ==false ){
    console.log("288strikes", strikes)  
      //draw head of hangman
      c1.beginPath();
      c1.arc(432.5,110, 20, 0, 2 * Math.PI);
      c1.stroke(); 
      strikes-= 1
      doStrikes()
      return
    }
    if(strikes == 4 && letter_present ==false){
      //draw the line of his body and his left leg
      c1.beginPath();
      c1.moveTo(432.5, 130);
      c1.lineTo(432.5, 200);
      c1.stroke();
      strikes-= 1

      c1.beginPath();
      c1.moveTo(432.5, 200);
      c1.lineTo(412.5, 240);
      c1.stroke();

      doStrikes()
      return
    }
    if(strikes == 3 && letter_present ==false){
      //draw the line of his arms, left eye, right eye, and frown
      c1.beginPath();
      c1.moveTo(417.5, 170);
      c1.lineTo(447.5, 150);
      c1.stroke();
      strikes-=1
      doStrikes()
      return
    }

  if(strikes == 2 && letter_present ==false){

      c1.beginPath();
      c1.ellipse(425.5, 105, 1, 3, 135, 0, 2 * Math.PI);
      c1.stroke();

      c1.beginPath();
      c1.ellipse(445.5, 105, 1, 3, 135, 0, 2 * Math.PI);
      c1.stroke();

      c1.beginPath();
      c1.arc(432.5,120, 7, 3.2, 2 * Math.PI);
      c1.stroke();
      strikes -= 1
      doStrikes()
      return
    }
    if(strikes == 1 && letter_present ==false){
      //draw his nose and his right leg
      

      c1.moveTo(435.5, 106);
      c1.lineTo(436.5, 109);
      c1.stroke();
      c1.beginPath();
      c1.arc(432.5,110, 20, 0, 2 * Math.PI);
      c1.stroke(); 

      c1.beginPath();
      c1.moveTo(432.5, 200);
      c1.lineTo(452.5, 240);
      c1.stroke();
      console.log("strikes remaining is 0")
      document.getElementById("youlost").innerHTML = "Oh geez! You hanged him." ;
      document.getElementById("playAgain").style.display = "block";
      clearTimeout(timerId)

    //fill in the word they were unable to spell so they can see it
      for (i = 0; i < the_word.length; i++){
        c.font = "30px Arial";
        var x = (0+ 30*i+ 10*i) ;
        c.fillText((the_word[i].toUpperCase()),x, 96 );
      }

      strikes -= 1
      doStrikes()
      return
    }     
  }
 }







//timer
function doTimer(timeLeft){

  var elem = document.getElementById('timer');

  timerId = setInterval(countdown, 1000);

  function countdown() {
    if (timeLeft == 0) {
      clearTimeout(timerId);
      elem.innerHTML = "Whoops! Time is up and game is over."
      //give the option to play again
      document.getElementById("playAgain").style.display = "block";
      //and we've also got to draw the hangman


      //fill in the word they were unable to spell in time so they can see it
      for (i = 0; i < the_word.length; i++){
        c.font = "30px Arial";
        var x = (0+ 30*i+ 10*i) ;
        c.fillText((the_word[i].toUpperCase()),x, 96 );
      } 

      //draw head of hangman
      c1.beginPath();
      c1.arc(432.5,110, 20, 0, 2 * Math.PI);
      c1.stroke(); 
 
      //draw the line of his body, left eye, and frown
      c1.beginPath();
      c1.moveTo(432.5, 130);
      c1.lineTo(432.5, 200);
      c1.stroke();

      c1.beginPath();
      c1.ellipse(425.5, 105, 1, 3, 135, 0, 2 * Math.PI);
      c1.stroke();

      c1.beginPath();
      c1.arc(432.5,120, 7, 3.2, 2 * Math.PI);
      c1.stroke();
      
      //draw the line of his arms, right eye
      c1.beginPath();
      c1.moveTo(417.5, 170);
      c1.lineTo(447.5, 150);
      c1.stroke();

      

      c1.beginPath();
      c1.ellipse(445.5, 105, 1, 3, 135, 0, 2 * Math.PI);
      c1.stroke();

      
      //draw his left leg and then his nose
      c1.beginPath();
      c1.moveTo(432.5, 200);
      c1.lineTo(412.5, 240);
      c1.stroke();

      c1.moveTo(435.5, 106);
      c1.lineTo(436.5, 109);
      c1.stroke();
      c1.beginPath();
      c1.arc(432.5,110, 20, 0, 2 * Math.PI);
      c1.stroke(); 
      //draw his right leg
      c1.beginPath();
      c1.moveTo(432.5, 200);
      c1.lineTo(452.5, 240);
      c1.stroke();


    } else {
      elem.innerHTML = timeLeft + ' seconds remaining';
      timeLeft--;
    }
 }}
doTimer(60)

globalScore = 0;

function doScore(){
  var elem2 = document.getElementById('score');
  elem2.innerHTML = "Score: "+ globalScore
}

doScore()
setInterval(doScore,500)

function updateScore(){
  if(globalDifficulty=="Easy"){
        globalScore += 2 
      }
      if(globalDifficulty=="Intermediate"){
        globalScore += 3
      }
      if(globalDifficulty=="Hard"){
        globalScore += 5
      }
   doScore()
   doStorage()   


}
//update difficulty level when difficulty variable changes 

globalDifficulty = "Easy"
function doDifficulty(){
  var elem3 = document.getElementById('difficulty');
  elem3.innerHTML = "Difficulty: "+ globalDifficulty
}
doDifficulty()

function doStrikes(){
  var elem4 = document.getElementById('strikes');
  elem4.innerHTML = "Strikes: "+ strikes
}
doStrikes()

function doCategory(theCategory){
  var elem5 = document.getElementById('category');
  elem5.innerHTML = "Category: "+ theCategory
}

console.log("637category" + category)
doCategory(category)

function doCorrectWords(){
  var elem5 = document.getElementById('solvedWords');
  elem5.innerHTML = "Solved Words: "+ correct_words
}

doCorrectWords()





//clears message underneath the hanging block
function clearMessage(){
  setTimeout(function(){ document.getElementById("youlost").innerHTML = " "}, 5000);

}

var stored_score;

if (stored_score === undefined) {
    stored_score = -1 ;
}



function doStorage(){
  // Check browser support
  if (typeof(Storage) !== "undefined") {
      // Store
      if (stored_score < globalScore){
        stored_score = globalScore
        localStorage.setItem("highScore", stored_score);
      // Retrieve
        document.getElementById("bestScore").innerHTML = "Best Score: " + localStorage.getItem("highScore");
      }
  } else {
      document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
    }
}

doStorage()

function playAgainAnimal(){
  //update scores and strikes
  hideButtons()
  strikes = 5
  doStrikes()
  globalScore = 0
  doScore()
  already_picked_letters = []
  correct_words = 0
  doCorrectWords()
  letters_written = 0
  globalDifficulty = "Easy"
  doDifficulty()
  document.getElementById("youlost").innerHTML = "" ;
  


  //new word
  clearLines(the_word)
  the_list = animals
  doCategory("Animals")
  index = pickIndex()
  the_word = the_list[index] 
  drawLines(the_word)
  doTimer(60)



  //clear the hangman image
        c1.beginPath();
        c1.fillStyle="lightblue";
        c1.rect(410,89,50,170); 
        c1.fill(); 
}

function playAgainPresident(){
  //update scores and strikes
  hideButtons()
  strikes = 5
  doStrikes()
  globalScore = 0
  doScore()
  already_picked_letters = []
  correct_words = 0
  doCorrectWords()
  letters_written = 0
  globalDifficulty = "Easy"
  doDifficulty()
  document.getElementById("youlost").innerHTML = " " ;
  


  //new word
  clearLines(the_word)
  the_list = presidents
  doCategory("Presidents")
  index = pickIndex()
  the_word = the_list[index] 
  drawLines(the_word)
  doTimer(60)



  //clear the hangman image
        c1.beginPath();
        c1.fillStyle="lightblue";
        c1.rect(410,89,50,170); 
        c1.fill(); 
}

function playAgainColors(){
  //update scores and strikes
  hideButtons()
  strikes = 5
  doStrikes()
  globalScore = 0
  doScore()
  already_picked_letters = []
  correct_words = 0
  doCorrectWords()
  letters_written = 0
  globalDifficulty = "Easy"
  doDifficulty()
  document.getElementById("youlost").innerHTML = "" ;

  


  //new word
  clearLines(the_word)
  the_list = colors
  doCategory("Colors")
  index = pickIndex()
  the_word = the_list[index] 
  drawLines(the_word)
  doTimer(60)



  //clear the hangman image
        c1.beginPath();
        c1.fillStyle="lightblue";
        c1.rect(410,89,50,170); 
        c1.fill(); 
}







//best score and best time display

//as soon as the window opens, make all of this pop up

window.onload = function() {
  console.log("just loaded")
  drawLines(the_word);
  
};