const CollectionClient = require('../clients/CollectionClient.js').default

const search = async (searchStr, accessKey) => {
    const collections = await CollectionClient.searchForCollections(searchStr, accessKey)
    // ToDo: check for whether the searchStr is not an end user address and return it as well 

    return collections.slice(0, 3)
}

const Search = {
    search
}

export default Search