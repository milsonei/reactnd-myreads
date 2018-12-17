import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import BookShelfChanger from './BookShelfChanger';
import {Badge, Icon} from 'antd';
/**
 * This component is responsible for rendering the cover page of the book and other information such as title, authors and cover.
 * This component presents two different types of behaviors. In the search screen result, if the book is already included in the user's shelf, a small icon is shown in the upper right corner, but in home, this icon is hidden.
 */
class Book extends PureComponent{
    static propTypes = {
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        publisher: PropTypes.string.isRequired,
        authors: PropTypes.array,
        thumbnail: PropTypes.string.isRequired,
        shelf: PropTypes.string.isRequired,
        showTag: PropTypes.bool.isRequired
    }

    /**
     * Execute the function 
     */
    handleBookShelfChange = (shelf) => {
        this.props.onBookShelfChange({id: this.props.id, title: this.props.title, shelf: this.props.shelf}, shelf)
    }
          
    render() {       
        const {title, authors, thumbnail, shelf, showTag, publisher} = this.props;       
        return (
            <li>                 
                <div className="book">
                    <div className="book-top">    
                    <Badge style={{ backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset' }} 
                           count={(shelf === 'none' || !showTag) ? 0 : (<Icon style={{ color: '#52c41a' }} theme="filled" type="tag"/>)}>                   
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${thumbnail}")` }}></div>   
                    </Badge>                           
                    <BookShelfChanger onBookShelfChange={this.handleBookShelfChange} shelf={shelf} />  
                    </div>                      
                    <div className="book-title">{title}</div>                      
                    <div className="book-authors">{authors.join(', ')}</div>               
                    <div className="book-publisher">by {publisher}</div>    
                </div>
               
            </li>
        )
    }
}

export default Book;