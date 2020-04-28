import React, {useEffect, useState} from 'react';

import Recipe from './Recipe';

import './App.css';

const App = () => {
  const APP_ID = '342551f8';
  const APP_KEY = '1d143b518fef7a8dc7e378dca376ffbd';

  const [recipes, setRecipies] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState('chicken');

  useEffect(() =>{
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipies(data.hits);
    console.log(data.hits);


  };

  const updateSearch = e =>{
    setSearch(e.target.value);
    
  }

  const getSearch = e =>{
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return(
    <div className="App" >
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch} />
        <button className="search-button" type="submit" >Search</button>
      </form>
      <div className="recipes">
        {recipes.map(recipe => (
          <Recipe
          key ={recipe.recipe.label}
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image} 
          ingredients={recipe.recipe.ingredients}
          />
        ))};
      </div>
    </div>
  )
}
export default App;
