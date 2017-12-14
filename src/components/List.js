import React from 'react';
import Book from './Book';

class List extends React.Component {
    render(){
        return(
            <ul>
                {this.props.data.map((data,i) => {
                    return <Book book={data} key={i}/>
                })}
            </ul>
        )
    }
}

export default List;