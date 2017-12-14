import React from 'react';
import Book from './Book';
import update from 'immutability-helper';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';


class List extends React.Component {
    constructor(){
        super();
        this.moveBook = this.moveBook.bind(this);
        this.state = {
            books: [{id: 1, title: "Little Life", author: "Hanya Yanagihara", price: "$12"}, {id: 2, title: "Seven Days of Us", author: "Francesca Hornak", price:"$17"}, {id: 3, title: "The Girl on the Train", author: "Paula Hawkins", price:"$10"}]
        }   
    }

    moveBook(dragIndex, hoverIndex){
        const {books} = this.state
        const dragBook = books[dragIndex];

        this.setState(
            update(this.state, {
                books: {
                    $splice: [[dragIndex,1], [hoverIndex, 0, dragBook]],
                }
            }),
        )
    }
    render(){
        const {books} = this.state
        return(
            <ul>
                {books.map((book, idx) => {
                    return <Book key={book.id}
                                index={idx}
                                id={book.id}
                                text={book}
                                moverBook={this.moveBook}/>
                })}
            </ul>
        )
    }
}

export default DragDropContext(HTML5Backend)(List);