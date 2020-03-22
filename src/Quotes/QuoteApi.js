import React from "react"
import axios from "axios"

class QuoteApi extends React.Component{
    constructor(){
        super()
        this.state={
            quotes : [],     //server quotes
            local : [],    //quotes saved
            isDisabled: false,    //save button disable
            singleQuote : '',     
            author : ''
        }
    }


    handleQuote=()=>{
        this.setState(prevState=>{
            const rand = prevState.quotes[Math.round(Math.random()*prevState.quotes.length)]    //select quote_obj from array of quotes
            return {singleQuote: rand.quote, author: rand.author, isDisabled:false}
        })
    }
    

    handleSave=()=>{
        this.setState(prevState=>{
            const array = JSON.parse(localStorage.getItem("quotes"))    //local storage setting
            const id = Math.floor(Math.random()*1000000)
            array.push({id:id,singleQuote: prevState.singleQuote, author: prevState.author})

            localStorage.setItem("quotes",JSON.stringify(array))
            return {local: array, isDisabled:true}
        })
    }

    componentDidMount(){
        axios.get("https://gist.githubusercontent.com/shreyasminocha/7d5dedafc1fe158f82563c1223855177/raw/325d51aca7165b2498971afcff9bed286a52dc0e/quotes.json")
        .then( response => {
            const arrayQuotes = response.data         //server response
            const rand = arrayQuotes[Math.round(Math.random()*arrayQuotes.length)]     //random quote to display at first

            const localValue = localStorage.getItem('quotes') ? JSON.parse(localStorage.getItem("quotes")) : []     //localStorage setting
            localStorage.setItem("quotes",JSON.stringify(localValue))

            this.setState({quotes: arrayQuotes, singleQuote: rand.quote, author: rand.author, local :  localValue})
        })
        .catch(error => {
            console.log(error)
        })
    }

    render(){
        return (
            
            <div className="display-quotes">
                <div className = "quote">
                    <h3>{this.state.singleQuote}</h3>
                    <h5>- {this.state.author}</h5>
                </div>
                <div className="buttons">
                    <input className="next-button button-style" type="button" value="next" onClick = {this.handleQuote}/> &nbsp;
                    <input className="save-button button-style" type="button" value={this.state.isDisabled ? "saved" : "save quote"} onClick = {this.handleSave} disabled={this.state.isDisabled}/>
                </div>
            </div>
            
        )
    }
}

export default QuoteApi