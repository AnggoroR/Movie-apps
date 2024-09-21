const searchMovies = () => {
    $('movie-list').html('');

    $.ajax({
        url: 'http://omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': 'ce4358cf',
            's': $('#search-element').val()
        },
        success: result => {
            if (result.Response == "True") {
                let movies = result.Search;

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

            } else {
                $('movie-list').html(`
                    <div class="col">
                        <h1 class="text-center">${result.Error}</h1>
                    </div>
                `)
            }
        }
    });
};
