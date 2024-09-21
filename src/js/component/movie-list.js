class MovieList extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `<div id="movie-list"></div>`;
    }
}

customElements.define('movie-list', MovieList);