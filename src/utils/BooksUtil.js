/**
 * This class provides support functions for the entire application
 */
class BooksUtil {
    /**
     * Get all shelf types
     */
    static getShelfTypes = () => {
        return [
            { id: 'currentlyReading', name:'Currently Reading', icon:'eye' },
            { id: 'wantToRead', name:'Want to Read', icon:'hourglass' },
            { id: 'read', name:'Read', icon:'check-circle' },
            { id: 'none', name:'None', icon: '' }
        ]
    }
     /**
     * Get shelf name
     * @param {string} shelfId The if of selected shelf
     */
    static getIcon = (shelfId) => {
        var shelfType = BooksUtil.getShelfTypes().find(shelf => shelf.id === shelfId);
        if (shelfType) return shelfType.icon;
        return '';
    }
    /**
     * Get shelf name
     * @param {string} shelfId The if of selected shelf
     */
    static getShelfName = (shelfId) => {
        var shelfType = BooksUtil.getShelfTypes().find(shelf => shelf.id === shelfId);
        if (shelfType) return shelfType.name;
        return '';
    }
    /**
     * This routine is responsible for setting the shelf
     * @param {Object} userShelves User's shelves configuration
     * @param {Array} books books from the search
     */
    static configShelf = (userShelves, books) => {
        let configuredBooks = [];
        const shelves = BooksUtil.getEntries(userShelves);

        books.forEach(book => {
            let newShelf = 'none';
            shelves.some(item => {
                const books = item.value;
                const bookFound = books.find(bookid => book.id === bookid);
                if (bookFound) {
                    newShelf = item.key;
                }
                return bookFound !== undefined;
            });

            configuredBooks.push({ ...book,
                shelf: newShelf
            });

        });

        return configuredBooks;
    }
    /**
     * This routine is responsible for updating the shelf of the books. Don't fetch remote data.
     * @param {Object} newShelves New shelves configuration
     * @param {Object} newShelves Current shelves configuration
     */
    static updaShelf = (newShelves, books) => {       
        BooksUtil.getEntries(newShelves).forEach(item => {          
            books.forEach(book => {
                const bookFound = item.value.find(bookId => book.id === bookId);
                if (bookFound) {
                    book.shelf = item.key;                       
                }
            });          
        });
        return books;
    }

    /**
     * Transform um JSON object in key value pair object {key: 1, value: 'x'}
     * @param {Object} obj JSON object
     */
    static getEntries = (obj) => {
        let result = [];
        const entries = Object.entries(obj);
        for (let i = 0; i < entries.length; i++) {
            const [key, value] = entries[i];
            result.push({
                key,
                value
            });
        }

        return result;
    }
}

export default BooksUtil