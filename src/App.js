import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie : null,
      searchResult: [],
      error: false
    };
    this.handleOnChange=this.handleOnChange.bind(this);
    this.searchMovie=this.searchMovie.bind(this);
    this.callApi=this.callApi.bind(this);
    this.displayError=this.displayError.bind(this);
  }

  handleOnChange(event) {
    this.setState({movie: event.target.value})
  }
  searchMovie() {
    this.callApi();
  }
  displayError(){
    if(this.state.error) {
    return(
     <span>Search Unsuccessful </span>
    )
    }
  }

callApi() {
  const BASEURL = "https://api.themoviedb.org/3/search/movie?";
  const APIKEY ="3deceb9041e72a8856191ddeaf96a293"
  let self = this;

  axios.get(`${BASEURL}api_key=${APIKEY}&query=${this.state.movie}`)
  .then(function (response) {
    self.setState({searchResult: response.data.results ,error:false })
    if (response.data.results.length=== 0){
      self.setState({error:true});
    }
  })
  .catch(function (error) {
    self.setState({error:true});
  });

}

  render() {
    let displayMovie= this.state.searchResult.map((movie)=>{
       return(
         <div className="search-info " key={movie.id}>
           <img src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path} alt={movie.title}/>
           <span>Movie: {movie.title} </span>
         </div>  
       )
    });
    return (
      <div className="root">
        <div className="logo">
          <h1> MOVIE Search </h1>
        </div>
        <div className="search-form">
          <input type="text" placeholder=" Search Movie" onChange={this.handleOnChange}/>
          <input type="button" value=" Search" onClick={this.searchMovie}/>
        </div>
        {displayMovie}
         {this.displayError()}
      </div>
    );
  }
}

export default App;
