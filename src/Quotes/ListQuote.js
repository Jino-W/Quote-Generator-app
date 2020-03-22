import React from "react"

class ListQuote extends React.Component{
    constructor(){
        super()
        this.state={
            local : [],
            isEdit: false,
            editQuote:"",
            editAuthor:"",
            editId:0
        }
    }
    

    componentDidMount(){
        const quoteArray = localStorage.getItem('quotes') ? JSON.parse(localStorage.getItem('quotes')) : []
        this.setState({local : quoteArray})
    }

    editHandle=(id)=>{
        const item = this.state.local.find((quote)=>{
            return quote.id === id
        })
        this.setState({isEdit:true, editQuote:item.singleQuote, editAuthor:item.author, editId: id})
    }

    handleEditQuote=(e)=>{
        const value = e.target.value
        this.setState({editQuote:value})
    }

    handleEditAuthor=(e)=>{
        const value = e.target.value
        this.setState({editAuthor:value})
    }

    handleUpdate=(e)=>{
        e.preventDefault()
        this.setState(prevState=>{
            const item = prevState.local.find((quote)=>{
                return quote.id === this.state.editId
            })
            item.singleQuote=this.state.editQuote
            item.author=this.state.editAuthor
            localStorage.setItem("quotes",JSON.stringify(prevState.local))
            return {local:prevState.local,isEdit:false,editId:0}
        })
    }

    handleCancel=(e)=>{
        e.preventDefault()
        this.setState({isEdit:false,editId:0})
    }

    deleteHandle=(id)=>{
        const quotes = JSON.parse(localStorage.getItem('quotes'))
        const item = quotes.find((quote)=>{
            return quote.id ===id
        })
        quotes.splice(quotes.indexOf(item),1)
        localStorage.setItem("quotes", JSON.stringify(quotes))
        this.setState({ local: quotes })
    }


    render(){
        return (
            <div className="listing-quotes">
                {this.state.local.map(each =>{
                    return (
                        <div>
                            {this.state.editId !== each.id ?

                                (<div key = {each.id} className="each-quote">
                                    <div className="text-style">
                                    <h3>{each.singleQuote}</h3>
                                    <h5>- {each.author}</h5>
                                    </div>
                                    <div className="list-buttons">
                                    <input className="small-button-style button-2" type="button" value="edit" onClick = {()=>{
                                        this.editHandle(each.id)
                                    }}/> &nbsp;
                                    <input className="small-button-style button-3" type="button" value="delete" onClick = {()=>{
                                        this.deleteHandle(each.id)
                                    }}/>
                                    </div>
                                    <hr/>
                                </div>
                                ):(<div>
                                    <form className='container edit-cont' onSubmit={this.handleUpdate}>
                                        <div className='form-row new-form'>
                                            <label for="quote">Quote</label>
                                            <textarea id="quote" value={this.state.editQuote} onChange={this.handleEditQuote}  />
                                        </div>
                                        <div className='form-row'>
                                            <label for="author">Author</label>
                                            <input id="author" type="text" value={this.state.editAuthor} onChange={this.handleEditAuthor}  />
                                        </div>
                                        <div className="list-buttons edit-button">
                                            <input className="small-button-style"  type="submit" value="update" /> &nbsp;&nbsp;
                                            <input className="small-button-style"  type="button" value="cancel" onClick={this.handleCancel}/>
                                        </div>
                                    </form>
                                    <hr/>
                                </div>)
                            }
                        </div>
                    )
                })}
            </div>
        )
    }
}


export default ListQuote




