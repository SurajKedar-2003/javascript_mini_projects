const question = document.getElementById('question');
const opt1 = document.getElementById('opt1');
const opt2 = document.getElementById('opt2');
const opt3 = document.getElementById('opt3');
const opt4 = document.getElementById('opt4');

const questions =[
    {
        "que" : "what is national animal of india ?",
        "answer" : [
            {"text" : "Tiger", "correct" : true},
            {"text" : "shark", "correct" : false},
            {"text" : "blue whale", "correct" : false},
            {"text" : "dolphin", "correct" : false}
        ]
    },
    {
        "que" : "which is national flag of india ?",
        "answer" : [
            {"text" : "blue flag", "correct" : false},
            {"text" : "white and red flag", "correct" : false},
            {"text" : "Tricolour", "correct" : true},
            {"text" : "twoColour", "correct" : false}
        ]
    },
    {
        "que" : "who is president of india ?",
        "answer" : [
            {"text" : "Pranav Mukharji", "correct" : false},
            {"text" : "Droupadi murmu", "correct" : true},
            {"text" : "Narendra Modi", "correct" : false},
            {"text" : "Indhira Gandhi", "correct" : false}
        ]
    },
    {
        "que" : "who is CM of Maharastra ?",
        "answer" : [
            {"text" : "Indhira Gandhi", "correct" : false},
            {"text" : "Narendra Modi", "correct" : false},
            {"text" : "West Bengal", "correct" : false},
            {"text" : "Eknath Shinde", "correct" : true}
        ]
    },
    {
        "que" : "what is national flower of india ?",
        "answer" : [
            {"text" : "Lotus", "correct" : true},
            {"text" : "rose", "correct" : false},
            {"text" : "Lily", "correct" : false},
            {"text" : "sun Flower", "correct" : false}
        ]
    }
];

let questionIndex = 0;
let Score = 0;

const showQuestion = () =>{

    question.innerHTML = `${questions[questionIndex].que}`
    opt1.innerHTML = `${questions[questionIndex].answer[0].text}`
    opt2.innerHTML = `${questions[questionIndex].answer[1].text}`
    opt3.innerHTML = `${questions[questionIndex].answer[2].text}`
    opt4.innerHTML = `${questions[questionIndex].answer[3].text}`
    
   
    questionIndex++;
}
console.log(questions.length);


document.querySelector('.quiz_div').addEventListener('click', (e)=>{
    if(e.target.classList.contains('next_btn')){
        console.log('event click');
        if(questionIndex < questions.length){
            showQuestion();
            
        }else{
            console.log('questions ends here'); 
            e.target.parentNode.style.display = "none";
            console.log(e.target.parentNode.nextElementSibling);//this gives the next sibiling element
            e.target.parentNode.nextElementSibling.style.display = "flex"    
        }
        
    }

    if(e.target.classList.contains('option_btn')){
        console.log('btn click');
        console.log(e.target.innerHTML);
        
        if(e.target.innerHTML === questions[questionIndex].answer[indexOf(e.target.innerHTML)].text){

        }
        
        
    }
})
const checkQuestions = ()=>{


}
showQuestion()





