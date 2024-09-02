const quote = document.getElementById('quote');
const author = document.getElementById('author');
const quote_btn = document.getElementById('new_quote');
const tweet_btn = document.getElementById('Tweet');


const getQuote = async()=>{

    const response = await fetch('https://api.quotable.io/random')
    .then(async(data)=>{
        return await data.json();
    }).then((data)=>{
        let response = data;
        return response;
    })

    console.log(response);

    quote.textContent = response.content;
    author.textContent = `--${response.author}`;
   
}

const tweet = () =>{
    
    window.open(`https://twitter.com/intent/tweet?text=${quote.textContent}     ${author.textContent}`, 'Tweet window','width = 600 height=400' )
}

document.querySelector('.button_div').addEventListener('click', (e)=>{

    if(e.target.textContent === 'New Quote'){
        getQuote();
    }

    if(e.target.textContent === 'Tweet'){
        tweet();
    }
})



getQuote();



