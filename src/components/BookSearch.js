import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import  BooksUtil from '../utils/BooksUtil';
import DialogUtil from '../utils/DialogUtil';
import BookList from './BookList';
import {Spin, Tooltip, Alert} from 'antd';
const ENTER_KEY = 13;
/**
 * This is a component responsible for generating a book listing based on the response sent by the BooksAPI javascript API.
 * The chosen book will be placed on a shelf after the reader's action.
 */
class BookSearch extends Component {
    
    state = {
        books:[], 
        loading: false,        
        lastTerm: '',
        error: '',
        sucess: '',
        currentUserShelves : {
            currentlyReading: [],
            wantToRead:[],
            read:[]
        }
    };
   
    /**
     * The search from BooksAPI is limited to a particular set of search terms
     */
    allowedSearchTerms = [
        'Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball',
         'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes',
          'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 
          'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 
          'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 
          'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 
          'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make',
          'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy',
          'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 
          'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh',
          'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'
    ];
    
    inputSearch = null;

   /**
     * Get current value from the text input search
     */
    getCurrentSearchTerm = () => {
        return this.inputSearch ? this.inputSearch.value : '';
    }

    /**
     * Focus the text input using the raw DOM API
     */
    focusInputSearch = () => {       
        if (this.inputSearch) this.inputSearch.focus();
    }

    close = () => {        
        this.props.onCloseSearchPage();        
    }

    componentDidUpdate(){        
        if (this.state.error){
            DialogUtil.showErrorNotification(this.state.error);            
        }else if (this.state.sucess){
            DialogUtil.showSuccessNotification(this.state.sucess);
        }
    }

    /**
     * After the first render, the getAll routine from BooksAPI fetches personal books remotely stored
     */
    componentDidMount(){    
        BooksAPI.getAll().then(books => {          
            this.setState({
                currentUserShelves : {
                    currentlyReading: books.filter(book => book.shelf === 'currentlyReading').map(book => book.id),
                    wantToRead: books.filter(book => book.shelf === 'wantToRead').map(book => book.id),
                    read: books.filter(book => book.shelf === 'read').map(book => book.id),
                }
            })
        });

        this.focusInputSearch();
    }

    /**
     * Search for books based on the informed term
     */
    search = (e) => {
        e.preventDefault();
      
        const myTerm = this.getCurrentSearchTerm();

        if (myTerm === ''){
            this.setState({
                sucess: '', 
                error: 'You must enter at least one search term!'
            });
            return;
        }

        if (myTerm === this.state.lastTerm) return;
       
        const foundTerms = this.allowedSearchTerms.filter((term) => term.toLowerCase().startsWith(myTerm.toLowerCase()));

        if (foundTerms.length > 0){    
            this.setState({loading : true, sucess: '', error:''});
            BooksAPI.search(myTerm).then((books) => {
                if (books.error){
                    this.setState({  sucess: '', error: books.error});
                }else{
                    const configuredBooks = BooksUtil.configShelf(this.state.currentUserShelves, books);             
                    this.setState({ 
                        lastTerm: myTerm,
                        loading: false,
                        error: '',
                        sucess: '',
                        books: configuredBooks 
                    });
                }
            }).catch(_ => {
                this.setState({  sucess: '', error: 'We could not search the books at this time, try another time!'});
            });
        }else{          
            this.setState({ sucess: '',  error: 'Unfortunality this term is not allowed!'});
        }
    }
   
    handleKeyDown = e => {
        if (e.keyCode === ENTER_KEY) {
            if (this.getCurrentSearchTerm() !== ''){
                this.search(e);
            }
        }
    }

    /**
     * Confirm the request for the selected book on the general search page. If the choise was 'none', the book will be removed from the persomal shelf after confirmation.
     */
    confirmRequestBook = (book, targetShelf) => {
        if (targetShelf === 'none'){
            DialogUtil.showConfirm(`Do you really want to remove the book "${book.title}" from shelf "${BooksUtil.getShelfName(book.shelf)}"?`, () => this.requestBook(book, targetShelf) );
        }else{
            this.requestBook(book, targetShelf)
        }
    }

    /**
     * Request a new book, put then in a shelf
     */
    requestBook = (book, targetShelf) => {              
        BooksAPI.update(book, targetShelf).then(result => {
            const configuredBooks = BooksUtil.configShelf(result, this.state.books);
            this.setState({ 
                books: configuredBooks, 
                currentUserShelves:result,
                error: '',
                sucess: targetShelf === 'none' 
                ? `The book "${book.title}" has been removed from the shelf "${BooksUtil.getShelfName(book.shelf)}"`
                : `The book "${book.title}" was added on the shelf "${BooksUtil.getShelfName(targetShelf)}"`                 
            });            
        }).catch(() => {
            this.setState({ sucess: '', error: `The book "${book.title}" can not been added to the shelf "${BooksUtil.getShelfName(targetShelf)}". Try later!`})          
        });
    }

    render() {      
        const result = this.state.books.length === 0 
        ? (<Alert
            message="After entering the title or author, press the return key or click the search button"           
            type="info"
            showIcon
            closable            
            />)
        :  ( <div>
                <label className="result-info">Search returned {this.state.books.length} books</label>
                <BookList showTag={true} key="search" onBookShelfChange={this.confirmRequestBook} books={this.state.books}/>
             </div>);
        return (
            <div className="search-books">
            <div className="search-books-bar">
            <Tooltip placement="rightBottom" title="Click here to back...">  
              <button className="close-search" onClick={this.close}>Close</button>
            </Tooltip>
            <div className="search-books-input-wrapper">                    
            <input  
                    ref={(input) => {this.inputSearch = input}} 
                    type="text"
                    onKeyDown={this.handleKeyDown}
                    placeholder="Search by title or author"                       
                    />
            
            </div>

            <button className="execute-search" onClick={this.search}>Search</button>

            </div>
            
            <div className="search-books-results">
            <Spin spinning={this.state.loading} tip="Loading...">      
            {result}
            </Spin>
            </div>
          </div>
        )
    }
}

export default BookSearch;