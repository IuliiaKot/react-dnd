import React from 'react';
import { findDOMNode} from 'react-dom';
import { DragSource, DropTarget} from 'react-dnd';
import flow from 'lodash/flow';

const style = {
    display: 'inline-block',
    border: 'solid 1px darkred',
    padding: '15px',
    width: '200px',
    margin: '1em',
    cursor: 'move',
    backgroundColor: 'white'
}


const bookSource = {
    beginDrag(props){
        return {
            id: props.id,
            index: props.index
        }
    },
}

const bookTarget = {
    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().index
        const hoverIndex = props.index

        if (dragIndex === hoverIndex){
            return 
        }

        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()
        const hoverMiddleY = (hoverBoundingRect.right - hoverBoundingRect.left) / 2
        const clientOffset = monitor.getClientOffset();
        const hoverClientY = clientOffset.x - hoverBoundingRect.left;

        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY){
            return
        } 

        props.moverBook(dragIndex, hoverIndex)

        monitor.getItem().indx = hoverIndex;
    },

}
function callbk(connect){
    return {
        connectDropTarget: connect.dropTarget(),
    }
}


function collect(connect, monitor){
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

 class Book extends React.Component {
    render(){
        const  {
            text, index, isDragging, connectDragSource, connectDropTarget } = this.props
        const opasity = isDragging ? 0 : 1 
        return (
            connectDragSource(
                connectDropTarget(
                    <div style={{...style, opasity}}>
                        <p><strong>Title: </strong>{text.title}</p>
                        <p><strong>Author: </strong>{text.author}</p>
                        <p><strong>Price: </strong>{text.price}</p>
                        <p>{index}</p>   
                    </div>
                )
            )
        )
    }
}

Book = DropTarget('book', bookTarget, callbk)(Book);
Book = DragSource('book', bookSource, collect)(Book);

export default Book;

