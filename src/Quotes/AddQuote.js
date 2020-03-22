import React from "react"


class AddQuote extends React.Component{
    constructor(){
        super()
        this.state={
            quote : "",
            author : "",
            created : []       //created quotes
        }
    }

    handleQuote=(e)=>{
        const value = e.target.value
        this.setState({quote:value})
    }

    handleauthor=(e)=>{
        const value = e.target.value
        this.setState({author:value})
    }

    submitHandle=(e)=>{
        e.preventDefault()

        const quotes = JSON.parse(localStorage.getItem("quotes"))          //local storage setting
        const id = Math.floor(Math.random()*1000000)
        quotes.push({id:id, singleQuote: this.state.quote, author:this.state.author})
        localStorage.setItem("quotes",JSON.stringify(quotes))

        this.setState(prevState=>{
            prevState.created.push({id:id, quote: this.state.quote, author:this.state.author})
            console.log(prevState.created)

            return {quote : "", author : ""}
        })
    }

    render(){
        return(
            <div className="outline">
                <form className='container add-change'>
                    <div className='form-row'>
                        <label for="quote">Quote</label>
                        <textarea id="quote" value={this.state.quote} onChange={this.handleQuote}  />
                    </div>

                    <div className='form-row'>
                        <label for="author">Author</label>
                        <input id="author" type="text" value={this.state.author} onChange={this.handleauthor}  />
                    </div>

                    <div className='form-row'>
                        <input className="button-style submit-button" type="submit" onClick = {this.submitHandle}/>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddQuote