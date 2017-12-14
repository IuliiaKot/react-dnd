import React from 'react';

const Book = function(props) {
    return (
        <li>
            <p><strong>Title: </strong>{props.book.title}</p>
            <p><strong>Author: </strong>{props.book.author}</p>
            <p><strong>Price: </strong>{props.book.price}</p>   
        </li>
    )
}

export default Book;