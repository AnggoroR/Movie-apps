// import $ from 'jquery';

// const main = () => {
//     $('movie-list').html('');

//     $.ajax({
//         url: 'http://omdbapi.com',
//         type: 'get',
//         dataType: 'json',
//         data: {
//             'apikey': 'ce4358cf',
//             's': $('#search-element').val()
//         },
//         success: result => {
//             if (result.Response == "True") {
//                 let movies = result.Search;

//                 $.each(movies, (i, data) => {
//                     $('movie-list').append(`
//                         <div class="col-lg-3 col-md-4 mt-5">
//                             <div class="card mb-3" style="height: 500px;">
//                                 <img src="${data.Poster}" class="card-img-top mh-100" alt="..." style="height: 380px;">
//                                 <div class="card-body">
//                                     <h5 class="card-title text-truncate">${data.Title}</h5>
//                                     <h6 class="card-subtitle mb-2 text-muted">${data.Year}</h6>
//                                     <a href="#" class="card-link see-more text-decoration-none" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${data.imdbID}">See More</a>
//                                 </div>
//                             </div>
//                         </div>
//                     `);
//                 });

//             } else {
//                 $('movie-list').html(`
//                     <div class="col">
//                         <h1 class="text-center">${result.Error}</h1>
//                     </div>
//                 `)
//             }
//         }
//     });
// }

// $('#search-button').on('click', () => {
//     main();
// });

// $('#search-element').on('keyup', (e) => {
//     if (e.which === 13) {
//         main();
//     }
// });


// $('movie-list').on('click', '.see-more', event => {

//     $.ajax({
//         url: 'http://omdbapi.com',
//         dataType: 'json',
//         type: 'get',
//         data: {
//             'apikey': 'ce4358cf',
//             'i': $(event.target).data('id')
//         },
//         success: movie => {
//             if (movie.Response === "True") {

//                 $('.modal-body').html(`
//                     <div class="container-fluid">
//                         <div class="row">
//                             <div class="col-md-4 text-center mb-4">
//                                 <img src="${movie.Poster}" class="img-fluid">
//                             </div>
//                             <div class="col-md-8">
//                                 <ul class="list-group">
//                                     <li class="list-group-item"><h3>${movie.Title}</h3></li>
//                                     <li class="list-group-item">Released : ${movie.Released}</li>
//                                     <li class="list-group-item">Genre : ${movie.Genre}</li>                 
//                                     <li class="list-group-item">Director : ${movie.Director}</li>                 
//                                     <li class="list-group-item">Actor : ${movie.Actors}</li>                 
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>
//                 `);
//             }
//         }
//     });
// });

// export default main;

import $ from 'jquery';
import MovieAPI from './movieAPI.js';

const movieAPI = new MovieAPI('ce4358cf');

const renderMovies = movies => {
    $('movie-list').html('');
    $.each(movies, (i, data) => {
        $('movie-list').append(`
      <div class="col-lg-3 col-md-4 mt-5">
        <div class="card mb-3" style="height: 500px;">
          <img src="${data.Poster}" class="card-img-top mh-100" alt="..." style="height: 380px;">
          <div class="card-body">
            <h5 class="card-title text-truncate">${data.Title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${data.Year}</h6>
            <a href="#" class="card-link see-more text-decoration-none" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${data.imdbID}">See More</a>
          </div>
        </div>
      </div>
    `);
    });
};

const renderMovieDetail = movie => {
    $('.modal-body').html(`
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-4 text-center mb-4">
                    <img src="${movie.Poster}" class="img-fluid">
                </div>
                <div class="col-md-8">
                    <ul class="list-group">
                        <li class="list-group-item d-flex justify-content-start">
                            <span class="fw-bold">Title: <span class="fw-normal">${movie.Title}</span></span>                           
                        </li>
                        <li class="list-group-item d-flex justify-content-start">
                            <span class="fw-bold">Year: <span class="fw-normal">${movie.Year}</span></span>
                        </li>
                        <li class="list-group-item d-flex justify-content-start">
                            <span class="fw-bold">Genre: <span class="fw-normal">${movie.Genre}</span></span>                           
                        </li>
                        <li class="list-group-item d-flex justify-content-start">
                            <span class="fw-bold">Director: <span class="fw-normal">${movie.Director}</span></span>                         
                        </li>
                        <li class="list-group-item d-flex justify-content-start">
                            <span class="fw-bold">Actors: <span class="fw-normal">${movie.Actors}</span></span>                          
                        </li>
                        <li class="list-group-item d-flex justify-content-start">
                            <span class="fw-bold">Plot: <span class="fw-normal">${movie.Plot}</span></span>                          
                        </li>
                        <li class="list-group-item d-flex justify-content-start">
                            <span class="fw-bold">IMDb Rating: <span class="fw-normal">${movie.imdbRating}</span></span>                           
                        </li>
                        <li class="list-group-item d-flex justify-content-start">
                            <span class="fw-bold">IMDb Votes: <span class="fw-normal">${movie.imdbVotes}</span></span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    `);
};

const searchMovies = () => {
    const searchQuery = $('#search-element').val().trim();
    if (searchQuery !== '') {
        movieAPI.searchMovies(searchQuery, movies => {
            renderMovies(movies);
        }, error => {
            alert(`Failed to search movies: ${error}`);
        });
    }
};

$(document).ready(() => {
    $('#search-button').on('click', searchMovies);
    $('#search-element').on('keypress', e => {
        if (e.which === 13) {
            searchMovies();
        }
    });

    $(document).on('click', '.see-more', function () {
        const imdbId = $(this).data('id');
        movieAPI.getMovieDetail(imdbId, movie => {
            renderMovieDetail(movie);
        }, error => {
            alert(`Failed to get movie detail: ${error}`);
        });
    });
});