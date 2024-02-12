const CollectionClient = require('../clients/CollectionClient.js').default

const SEARCH_RESULTS_LIMIT = 6

const search = async (searchStr, accessKey) => {
    const collections = await CollectionClient.searchForCollections(searchStr, accessKey)
    // ToDo: check for whether the searchStr is not an end user address and return it as well 

    return collections.slice(0, SEARCH_RESULTS_LIMIT)
}

const Search = {
    search
}

export default Search