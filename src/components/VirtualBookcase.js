import React, {Component} from 'react';
import * as BooksAPI from './BooksAPI';
import BooksUtil from '../utils/BooksUtil';
import DialogUtil from '../utils/DialogUtil';
import BookShelf from './BookShelf';
import {Spin, Col, Row} from 'antd';
/**
 * This is a component responsible for generating the reader's book page. 
 * This page is responsive according to screen size, and for screens larger than 796px, the shelves are arranged in columns and on smaller screens, they are arranged in lines. 
 * This feature is provided by the Row and Col components of the ANTD library.
 */
class VirtualBookcase extends Component{
    constructor(props){
        super(props);
        this.shelfTypes = BooksUtil.getShelfTypes();
    }

    state={   
        loading: true,
        sucess:'',
        error: '',
        books:[],
        height: "auto"
    }

    /**
   * Calculate & Update state of new dimensions
   */
    updateDimensions() {                
        this.setState({ 
            sucess:'',
            error: '',
            height: this.getUpdatedWindowHeight() 
        });        
    }

    /**
     * Get updated window heigth
     */
    getUpdatedWindowHeight(){
        let update_height = window.innerHeight - 200;
        if (window.innerWidth <= 992){
            update_height = Math.round(update_height / 3) - 20;
            if (update_height < 320){
                return "auto";
            }
        }
        return update_height;
    }
    /**
     * Shelf types
     */
    shelfTypes = null;
    /**
     * After the first render, the getAll routine from BooksAPI fetches personal books remotely stored
     */
    componentDidMount(){
        this.updateDimensions()
        
        window.addEventListener("resize", this.updateDimensions.bind(this));    

        BooksAPI.getAll().then(books => {
            this.setState(oldState => ({ 
                ...oldState,
                loading: false,
                books: books
            }))
        })
    }
    
    /**
     * Remove event listener
     */
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions.bind(this));        
    }

    /**
     * Show a notification after render page
     */
    componentDidUpdate(){
        if (this.state.error){
            DialogUtil.showErrorNotification(this.state.error);
        }else if (this.state.sucess){
            DialogUtil.showSuccessNotification(this.state.sucess);
        }
       
    }

    /**
     * This routine confirms moving book to another shelf. If the option is "none", the book should be removed from the bookshelf after confirmation by the user
     */
    confirmMoveBookToAnotherShelf = (book, targetShelf) => {
        if (targetShelf === 'none'){
            DialogUtil.showConfirm(`Do you really want to remove the book "${book.title}" from shelf "${BooksUtil.getShelfName(book.shelf)}"?`, () => this.moveBookToAnotherShelf(book, targetShelf) );
        }else{
            this.moveBookToAnotherShelf(book, targetShelf)
        }
    }

    /**
     * Move book to another shelf
     * @param {Number} bookid Book identification
     * @param {String} targetShelf Target shelf name
     */
    moveBookToAnotherShelf = (book, targetShelf) => {
        BooksAPI.update(book, targetShelf).then(result => {           
            this.setState(oldState => ({ 
                ...oldState,
                error: '',
                sucess: targetShelf === 'none' 
                                               ? `The book "${book.title}" has been removed from the shelf "${BooksUtil.getShelfName(book.shelf)}"`
                                               : `The book "${book.title}" has been moved to the shelf "${BooksUtil.getShelfName(targetShelf)}"`,
                books: BooksUtil.updaShelf(result, oldState.books)             
            }));
          
        }).catch((error) => {
            console.log(error);
            this.setState({sucess: '', error: targetShelf === 'none' 
            ? `The book "${book.title}" has not been removed from the shelf "${BooksUtil.getShelfName(book.shelf)}"`
            : `The book "${book.title}" can not been moved to the shelf "${BooksUtil.getShelfName(targetShelf)}". Try later!`})
        });

    }

    render(){             
        return (<Row gutter={24}>
            {this.shelfTypes.filter(shelf => shelf.id !== 'none').map(shelf => (             
            <Col key={`col-${shelf.id}`} xs={{ span: 24, offset: 0 }}  sm={{ span: 24, offset: 0 }}  md={{ span: 8, offset: 0 }}>
            <Spin key={`spin-${shelf.id}`} spinning={this.state.loading} tip="Loading..."> 
            <BookShelf key={shelf.id} 
                       onBookShelfChange={this.confirmMoveBookToAnotherShelf} 
                       books={this.state.books.filter(book => book.shelf === shelf.id)} 
                       name={shelf.name} 
                       id={shelf.id}
                       height ={this.state.height} />  
            </Spin>   
            </Col>            
        ))}
        </Row>);
    }
}

export default VirtualBookcase;