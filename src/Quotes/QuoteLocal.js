import React from "react"

class QuoteLocal extends React.Component{
    constructor(){
        super()
        this.state={
            local : [],
            singleQuote:"",
            author:"",
            count : 0   // to find length of the localStorage array to display the quotes
        }
    }


    handleQuote=()=>{
        this.setState(prevState=>{
            if(prevState.count>=0){
                const rand = prevState.local[prevState.count]
                return {singleQuote: rand.singleQuote, author: rand.author,count : prevState.count-1}
            }
            else if(prevState.count<0){
                prevState.count = prevState.local.length-1
                const rand = prevState.local[prevState.count]
                return {singleQuote: rand.singleQuote, author: rand.author, count : prevState.count-1}
            }
        })
    }

    componentDidMount(){
        const localValue = localStorage.getItem('quotes') ? JSON.parse(localStorage.getItem('quotes')) : []
        if (localValue.length > 0) {
            const rand = localValue[0]
            this.setState({singleQuote: rand.singleQuote, author: rand.author, local : localValue, count:localValue.length-1})
        }else{
            this.setState({singleQuote:'LocalStorage is empty'})
        }
    }


    render(){
        return (
            <div className="display-quotes" >
                <div className = "quote">
                <h3>{this.state.singleQuote}</h3>
                <h5>- {this.state.author}</h5>
                </div>
                
                <div className="buttons buttons-1">
                <button  className="next-local-button button-style" onClick = {this.handleQuote}>next</button>
                </div>
            </div>
        )
    }
}


export default QuoteLocal