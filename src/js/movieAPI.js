import $ from 'jquery';

class MovieAPI {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.apiUrl = 'http://omdbapi.com';
    }

    searchMovies(searchQuery, successCallback, errorCallback) {
        $.ajax({
            url: this.apiUrl,
            type: 'get',
            dataType: 'json',
            data: {
                'apikey': this.apiKey,
                's': searchQuery
            },
            success: result => {
                if (result.Response == "True") {
                    let movies = result.Search;
                    successCallback(movies);
                } else {
                    errorCallback(result.Error);
                }
            },
            error: (xhr, status, error) => {
                errorCallback(error);
            }
        });
    }

    getMovieDetail(imdbId, successCallback, errorCallback) {
        $.ajax({
            url: this.apiUrl,
            dataType: 'json',
            type: 'get',
            data: {
                'apikey': this.apiKey,
                'i': imdbId
            },
            success: movie => {
                if (movie.Response === "True") {
                    successCallback(movie);
                } else {
                    errorCallback(movie.Error);
                }
            },
            error: (xhr, status, error) => {
                errorCallback(error);
            }
        });
    }
}

export default MovieAPI;
