const express=require("express");
const app=express();
const PORT=4000;
const movies=[
    {
     "id": "101",
     "name": "John Wick",
     "poster": "https://m.media-amazon.com/images/M/MV5BMTU2NjA1ODgzMF5BMl5BanBnXkFtZTgwMTM2MTI4MjE@._V1_.jpg",
     "rating": 7.8,
     "summary": "A retired hit man is forced back into the underground world of assassins when he embarks on a merciless rampage to hunt down his adversaries.",
     "trailer": "https://www.youtube.com/embed/2AUmvWm5ZDQ"
    },
    {
     "id": "102",
     "name": "Hunt for the Wilder People",
     "poster": "https://m.media-amazon.com/images/M/MV5BMjI1MDQ2MDg5Ml5BMl5BanBnXkFtZTgwMjc2NjM5ODE@._V1_FMjpg_UX1000_.jpg",
     "rating": 7.8,
     "summary": "A national manhunt is ordered for a rebellious kid and his foster uncle who go missing in the wild New Zealand bush.",
     "trailer": "https://www.youtube.com/embed/dPaU4Gymt3E"
    },
    {
     "id": "103",
     "name": "What we do in shadows",
     "poster": "https://picfiles.alphacoders.com/142/142921.jpg",
     "rating": 7.6,
     "summary": "Viago, Deacon, and Vladislav are vampires who are struggling with the mundane aspects of modern life, like paying rent, keeping up with the chore wheel, trying to get into nightclubs, and overcoming flatmate conflicts.",
     "trailer": "https://www.youtube.com/embed/IAZEWtyhpes"
    },
    {
     "id": "104",
     "name": "Lord of the Rings:Fellowship of the Ring",
     "poster": "https://i.pinimg.com/originals/f1/43/69/f14369fb56e47283f02038b920654056.jpg",
     "rating": 8.8,
     "summary": "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
     "trailer": "https://www.youtube.com/embed/V75dMMIW2B4"
    },
    {
     "id": "105",
     "name": "Boy",
     "poster": "https://m.media-amazon.com/images/M/MV5BMjc4MjQ2ODQyNF5BMl5BanBnXkFtZTcwOTE0NzIzNw@@._V1_FMjpg_UX1000_.jpg",
     "rating": 7.5,
     "summary": "Boy, an 11-year-old child and devout Michael Jackson fan who lives on the east coast of New Zealand in 1984, gets a chance to know his absentee criminal father, who has returned to find a bag of money he buried years ago.",
     "trailer": "https://www.youtube.com/embed/oP05fUP9xAo"
    },
    {
     "id": "106",
     "name": "JoJo Rabbit",
     "poster": "https://cdn.shopify.com/s/files/1/0969/9128/products/JoJo_Rabbit_-_Taika_Watiti_-_Oscar_2019_-_Hollywood_War_Satire_Comedy_Movie_Poster_c514ecf3-f83b-4b65-a8af-11dd10c1a2bd.jpg?v=1583300109",
     "rating": 7.9,
     "summary": "A young German boy in the Hitler Youth whose hero and imaginary friend is the countrys dictator is shocked to discover that his mother is hiding a Jewish girl in their home.",
     "trailer": "https://www.youtube.com/embed/tL4McUzXfFI"
    },
    {
     "id": "107",
     "name": "Thor Ragnarok🔨",
     "poster": "https://m.media-amazon.com/images/M/MV5BMjMyNDkzMzI1OF5BMl5BanBnXkFtZTgwODcxODg5MjI@._V1_FMjpg_UX1000_.jpg",
     "rating": 7.9,
     "summary": "Imprisoned on the planet Sakaar, Thor must race against time to return to Asgard and stop Ragnarök, the destruction of his world, at the hands of the powerful and ruthless villain Hela.",
     "trailer": "https://www.youtube.com/embed/ue80QwXMRHg"
    }
   ]
app.get("/",function(request,response){
    response.send("Welcome to Onstream");
});

app.get("/movies",function(request,response){
    response.send(movies);
});

app.get("/movies/:id",function(request,response){
    const {id}=request.params;
    console.log(request.params,id);
    const movie=movies.find((mv)=>mv.id===id);
    console.log(movie);

    movie?response.send(movie):response.status(404).send({message:"Movie not Found"});
});
app.listen(PORT);