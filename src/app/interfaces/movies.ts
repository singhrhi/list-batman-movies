export interface details {
    "Title":string,
    "Year":string,
    "imdbID":string,
    "Type":string,
    "Poster":string
}

export interface Movies {

    "Search":details [],
    "totalResults":string,
    "Response":string
}

export interface Movie {
    "Title":string,
    "Year":string,
    "Rated":string,
    "Released":string,
    "Runtime":string,
    "Genre":string,
    "Director":string,
    "Writer":string,
    "Actors":string,
    "Plot":string,
    "Language":string,
    "Country":string,
    "Awards":string,
    "Poster":string,
    "Ratings":[
       {
          "Source":string,
          "Value":string
       },
       {
          "Source":string,
          "Value":string
       },
       {
          "Source":string,
          "Value":string
       }
    ],
    "Metascore":string,
    "imdbRating":string,
    "imdbVotes":string,
    "imdbID":string,
    "Type":string,
    "DVD":string,
    "BoxOffice":string,
    "Production":string,
    "Website":string,
    "Response":string
 }