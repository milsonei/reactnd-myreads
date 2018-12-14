import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BookList from './BookList';
import {Alert} from 'antd';
class BookShelf extends Component{
    static propTypes = {
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        books: PropTypes.array,
        onBookShelfChange: PropTypes.func.isRequired
    }

    handleBookShelfChange = (book, toShelf) => {     
        this.props.onBookShelfChange(book, toShelf)
    }

    render(){
        const {name, id, books} = this.props;
        const result = this.props.books.length === 0 
        ? (
            <Alert
            message="Waiting for new books..."
            type="warning"
            showIcon
            closable            
            />
            )
        : (
            <BookList key={id} 
            onBookShelfChange={this.handleBookShelfChange} 
            books={books} 
            showTag={false}
            shelf={id}/>
        );
        return (
            <div style={{height: this.props.height}} className="bookshelf">
                <h2 className="bookshelf-title">{name}</h2>
                <div style={{height: this.props.height}} className="bookshelf-books"> 
                 {result} 
                </div>
                <div className="bookshelf-footer">{books.length} books</div>
            </div> 
        )
    }
}

export default BookShelf