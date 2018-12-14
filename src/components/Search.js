import React from 'react'
import BookSearch from './BookSearch'
function Search(props){
    return (
        <BookSearch onCloseSearchPage={() => { props.history.push("/") }}/>
    )
}

export default Search;