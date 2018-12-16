import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BooksUtil from '../utils/BooksUtil';
/**
 * This is a component responsible for orchestrating the change of a particular book to another shelf, as well as permanently removing it from the reader's shelves. 
 * The request is cascaded for each parent component, until finally it is sent remotely by the responsible API.
 */
class BookShelfChanger extends Component{
    constructor(props){
        super(props);
        this.shelfTypes = BooksUtil.getShelfTypes();
    }

    static propTypes = {
        onBookShelfChange: PropTypes.func.isRequired,
        shelf: PropTypes.string.isRequired
    }
 
    shelfTypes = null;

    handleChange = (e) => {    
        this.props.onBookShelfChange(e.target.value)
    }

    render() {
        const {bookid, shelf} = this.props;
        return (
            <div className="book-shelf-changer">
                <select key={`shelf-book-${bookid}`} value={shelf} onChange={this.handleChange}>
                    <option value="move" disabled>Move to...</option>
                    { this.shelfTypes.map(option => (<option key={option.id} value={option.id}>{option.name}</option>)) }          
                </select>
            </div>
        )
    }
}

export default BookShelfChanger