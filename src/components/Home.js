import React from 'react';
import VirtualBookcase from './VirtualBookcase'
function Home(props){
    return (
        <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
          <VirtualBookcase />                        
          </div>
        </div>
        <div className="open-search">
          <button onClick={() => { props.history.push("/search") }}>Add a book</button>
        </div>
      </div>
    )
}

export default Home;