Instructor: [00:00] The APIs data describes to us the entities, people, films, planets, etc., that exist in the "Star Wars" universe. Each entity endpoint in the API returns a list of entities of that type, their properties, and links to other entities that they share some relationship with.

[00:15] In a graph model, however, these relationships would be explicit connections between entities. We'll use Arrow tool at apcjones.com/arrows to build a visual representation of our model. Let's start out by creating a node for each type of entity found in SWAPI, person, film, species, planet, vehicle, and starship.

[00:37] After creating each node, we'll double-click on it to bring up a dialogue which will allow us to define some data on it. Once we have all of our nodes created, we can begin drawing relationships between them. Each entity appeared in a film, so let's start by creating an Appeared In relationship directed from each back to film.

[01:00] Now that we can clearly see that everything in our model appeared in a movie, let's take a look at SWAPI.co/API/people and see what other relationships we need to represent. We can see that each person node has a number of their own properties as well as outgoing relationships for home world, species, vehicles, starships, and films.

[01:26] Let's create relationships with types that are descriptive of what they represent, has home world, has species, has vehicle, has starship, and we can skip our existing appeared in type. Thoughtful reorganizing of our nodes and their relationships will enhance legibility and allow us to get a birds-eye view of our entire graph and the directionality of our data.

[01:49] Flipping through some of the other entity endpoints reveals that the rest of the relationships are incoming versions of the outgoing relationships we've already specified, such as has pilot versus has starship. For now, this representation is sufficient. If we find that we want to flesh out our model to be focused on those incoming relationships, we can feel free to add them later.

[02:11] Now that we know what we think our graph should look like, we can begin populating the database with data and fleshing out how we want to ask the questions we want it to answer for us.
