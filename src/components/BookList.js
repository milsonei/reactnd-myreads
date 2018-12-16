import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Book from './Book'
import sortBy from 'sort-by'
/**
 * Default image for cover not available
 */
import CoverImageNotAvailable from '../images/cover-image-not-available.png'

/**
 * This is a component responsible for generating a book listing, thus rendering a collection based on the component Book.
 */
class BookList extends Component{
    
    static propTypes = {
        books: PropTypes.array,
        showTag: PropTypes.bool.isRequired 
    }

    handleBookShelfChange = (book, toShelf) => {     
        this.props.onBookShelfChange(book, toShelf)
    }
 
    render(){           
        return (           
            <ol className="books-grid">
            { this.props.books && this.props.books.sort(sortBy('title')).map(book => 
                (<Book key={book.id} 
                            id={book.id} 
                            showTag={this.props.showTag}
                            title={book.title} 
                            publisher={book.publisher}
                            authors={book.authors || []} 
                            thumbnail={(book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.thumbnail : CoverImageNotAvailable)} 
                            onBookShelfChange={this.handleBookShelfChange} 
                            shelf={book.shelf || 'none'}/>)
                )
            }                
            </ol>       
        )
    }
}

export default BookList;