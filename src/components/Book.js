import React from 'react';
import { findDOMNode} from 'react-dom';
import { DragSource, DropTarget} from 'react-dnd';
import flow from 'lodash/flow';

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
    // debugger
    return {
        connectDropTarget: connect.dropTarget(),
    }
}

// DropTarget('book', bookTarget, connect => ({
//     connectDropTarget: connect.DropTarget(),
// }))

function collect(connect, monitor){
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}


// DragSource('book', bookSource, (connect, monitor) => ({
//     connectDragSource: connect.DragSourceI(),
//     isDraggin: monitor.isDraggin(),
// }))


 class Book extends React.Component {
    render(){
        // debugger
        const  {
            text, isDragging, connectDragSource, connectDropTarget } = this.props
        const opasity = isDragging ? 0 : 1 
        return (
            connectDragSource(
                connectDropTarget(
                    <li style={{opasity}}>
                        <p><strong>Title: </strong>{this.props.text.title}</p>
                        <p><strong>Author: </strong>{this.props.text.author}</p>
                        <p><strong>Price: </strong>{this.props.text.price}</p>   
                    </li>
                )
            )
        )
    }
}

Book = DropTarget('book', bookTarget, callbk)(Book);
Book = DragSource('book', bookSource, collect)(Book);

export default Book;

