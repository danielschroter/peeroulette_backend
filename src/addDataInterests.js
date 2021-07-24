var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("moviedb");
    var myobj = {
        name: "Part GmbH",
        confirmed: false,
        verified_by: "5706dcb2e69695f3096743af",
        organization: "60c859dbd47d0f0aa4727fcf",
    };

    var appointments = {
            title: "DeepL Exam",
            startDate: '2021-07-13T15:45',
            endDate: '2021-07-13T17:45',
            description: "Write an DeepL Exam",
            link: "Jitsi URL1",
            user: '60ecae1607bc0e63ac91e780',
            interests: ["Business and Industry"],
    }

    var interests = {
        facebookInterests:
            ["Business and Industry",
                "Advertising",
                "Agriculture",
                "Architecture",
                "Aviation",
                "Banking",
                "Investment banking",
                "Online banking",
                "Retail banking",
                "Business",
                "Construction",
                "Design",
                "Fashion design",
                "Graphic design",
                "Interior design",
                "Economics",
                "Engineering",
                "Entrepreneurship",
                "Health care",
                "Higher education",
                "Management",
                "Marketing",
                "Nursing",
                "Online",
                "Digital marketing",
                "Display advertising",
                "Email marketing",
                "Online advertising",
                "Search engine optimization",
                "Social media",
                "Social media marketing",
                "Web design",
                "Web development",
                "Web hosting",
                "Personal finance",
                "Creditcards",
                "Insurance",
                "Investment",
                "Mortgage loans",
                "Real estate",
                "Retail",
                "Sales",
                "Science",
                "Small business",
                "Entertainment",
                "Games",
                "Action games",
                "Board games",
                "Browser games",
                "Card games",
                "Casino games",
                "First-person shooter games",
                "Gambling",
                "Massively multiplayer online games",
                "Massively multiplayer online role-playing games",
                "Online games",
                "Online poker",
                "Puzzle video games",
                "Racing games",
                "Role-playing games",
                "Shooter games",
                "Simulation games",
                "Sports games",
                "Strategy games",
                "Video games",
                "Word games",
                "Live events",
                "Ballet",
                "Bars",
                "Concerts",
                "Dancehalls",
                "Music festivals",
                "Nightclubs",
                "Parties",
                "Plays",
                "Theatre",
                "Movies",
                "Action movies",
                "Animated movies",
                "Anime movies",
                "Bollywood movies",
                "Comedy movies",
                "Documentary movies",
                "Drama movies",
                "Fantasy movies",
                "Horror movies",
                "Musical theatre",
                "Science fiction movies",
                "Thriller movies",
                "Music",
                "Blues music",
                "Classical music",
                "Country music",
                "Dance music",
                "Electronic music",
                "Gospel music",
                "Heavy metal music",
                "Hip hop music",
                "Jazz music",
                "Music videos",
                "Pop music",
                "Rhythm and blues music",
                "Rock musicSoul music",
                "Reading",
                "Books",
                "Comics",
                "E-books",
                "Fiction books",
                "Literature",
                "Magazines",
                "Manga",
                "Mystery fiction",
                "Newspapers",
                "Non-fiction books",
                "Romance novels",
                "TV",
                "TV comedies",
                "TV game shows",
                "TV reality shows",
                "TV talkshows",
                "Family and relationships",
                "Dating",
                "Family",
                "Fatherhood",
                "Friendship",
                "Marriage",
                "Motherhood",
                "Parenting",
                "Weddings",
                "Fitness and wellness",
                "Bodybuilding",
                "Meditation",
                "Physical exercise",
                "Physical fitness",
                "Running",
                "Weight training",
                "Yoga",
                "Food and drink",
                "Alcoholic beverages",
                "Beer",
                "Distilled beverage",
                "Wine",
                "Beverages",
                "Coffee",
                "Energy drinks",
                "Juice",
                "Soft drinks",
                "Tea",
                "Cooking",
                "Baking",
                "Recipes",
                "Cuisine",
                "Chinese cuisine",
                "French cuisine",
                "German cuisine",
                "Greek cuisine",
                "Indian cuisine",
                "Italian cuisine",
                "Japanese cuisine",
                "Korean cuisine",
                "Latin American cuisine",
                "Mexican cuisine",
                "Middle Eastern cuisine",
                "Spanish cuisine",
                "Thai cuisine",
                "Vietnamese cuisine",
                "Food",
                "Barbecue",
                "Chocolate",
                "Desserts",
                "Fast food",
                "Organic food",
                "Pizza",
                "Seafood",
                "Veganism",
                "Vegetarianism",
                "Restaurants",
                "Coffeehouses",
                "Diners",
                "Fast casual restaurants",
                "Fast food restaurants",
                "Hobbies and activities",
                "Arts and music",
                "Acting",
                "Crafts",
                "Dance",
                "Drawing",
                "Drums",
                "Fine art",
                "Guitar",
                "Painting",
                "Performing arts",
                "Photography",
                "Sculpture",
                "Singing",
                "Writing",
                "Current events",
                "Home and garden",
                "Do it yourself (DIY)",
                "Furniture",
                "Gardening",
                "Home Appliances",
                "Home improvement",
                "Pets",
                "Birds",
                "Cats",
                "Dogs",
                "Fish",
                "Horses",
                "Pet food",
                "Rabbits",
                "Reptiles",
                "Politics and social issues",
                "Charity and causes",
                "Community issues",
                "Environmentalism",
                "Law",
                "Military",
                "Politics",
                "Religion",
                "Sustainability",
                "Veterans",
                "Volunteering",
                "Travel",
                "Adventure travel",
                "Air travel",
                "Beaches",
                "Car rentals",
                "Cruises",
                "Ecotourism",
                "Hotels",
                "Lakes",
                "Mountains",
                "Nature",
                "Theme parks",
                "Tourism",
                "Vacations",
                "Vehicles",
                "Automobiles",
                "Boats",
                "Electric vehicle",
                "Hybrids",
                "Minivans",
                "Motorcycles",
                "RVs",
                "SUVs",
                "Scooters",
                "Trucks",
                "Shopping and fashion",
                "Beauty",
                "Beauty salons",
                "Cosmetics",
                "Fragrances",
                "Hair products",
                "Spas",
                "Tattoos",
                "Clothing",
                "Children’s clothing",
                "Men’s clothing",
                "Shoes",
                "Women’s clothing",
                "Fashionaccessories",
                "Dresses",
                "Handbags",
                "Jewelry",
                "Sunglasses",
                "Shopping",
                "Boutiques",
                "Coupons",
                "Discount stores",
                "Luxury goods",
                "Online shopping",
                "Shopping malls",
                "Toys",
                "Sports and outdoors",
                "Outdoor recreation",
                "Boating",
                "Camping",
                "Fishing",
                "Horseback riding",
                "Hunting",
                "Mountain biking",
                "Surfing",
                "Sports",
                "American football",
                "Association football (Soccer)",
                "Auto racing",
                "Baseball",
                "Basketball",
                "College football",
                "Golf",
                "Marathons",
                "Skiing",
                "Snowboarding",
                "Swimming",
                "Tennis",
                "Thriathlons",
                "Volleyball",
                "Technology",
                "Computers",
                "Computer memory",
                "Computer monitors",
                "Computer processors",
                "Computer servers",
                "Desktop computers",
                "Free software",
                "Hard drives",
                "Network storage",
                "Software",
                "Tablet computers",
                "Consumer electronics",
                "Audio equipment",
                "Camcorders",
                "Cameras",
                "E-book readers",
                "GPS devices",
                "Game consoles",
                "Mobile phones",
                "Portable media players",
                "Projectors",
                "Smartphones",
                "Televisions",
            ],
    }

        var shorterInterests = {
                facebookInterests:
                    ["Business",
                            "Advertising",
                            "Agriculture",
                            "Aviation",
                            "Banking",
                            "Investment",
                            "Design",
                            "Fashion",
                            "Graphic",
                            "Interior",
                            "Design",
                            "Economics",
                            "Engineering",
                            "Start-Ups",
                            "Health care",
                            "Education",
                            "Management",
                            "Marketing",
                            "Nursing",
                            "Online",
                            "Marketing",
                            "SEO",
                            "Social media",
                            "Web design",
                            "Web devel.",
                            "Web hosting",
                            "Finance",
                            "Insurance",
                            "Loans",
                            "Real estate",
                            "Retail",
                            "Sales",
                            "Science",
                            "Games",
                            "Gambling",
                            "Online games",
                            "Online poker",
                            "Video games",
                            "Racing games",
                            "RPGs",
                            "Shooter games",
                            "Strategy",
                            "Video games",
                            "Word games",
                            "Live events",
                            "Ballet",
                            "Bars",
                            "Concerts",
                            "Dancehalls",
                            "Festivals",
                            "Nightclubs",
                            "Parties",
                            "Plays",
                            "Theatre",
                            "Movies",
                            "Animes",
                            "Comedy",
                            "Documentaries",
                            "Fantasy",
                            "Horror",
                            "Musicals",
                            "Theater",
                            "Sci-Fi movies",
                            "Thrillers",
                            "Music",
                            "Blues",
                            "Classical",
                            "Country",
                            "Dance",
                            "Electronic",
                            "Gospel",
                            "Heavy metal",
                            "Hip hop",
                            "Jazz music",
                            "Music videos",
                            "Pop music",
                            "Reading",
                            "Books",
                            "Comics",
                            "E-books",
                            "Fiction books",
                            "Literature",
                            "Magazines",
                            "Manga",
                            "Mystery",
                            "Newspapers",
                            "Non-fiction",
                            "Novels",
                            "TV",
                            "TV comedies",
                            "Game shows",
                            "Reality shows",
                            "TV talkshows",
                            "Family",
                            "Relationships",
                            "Dating",
                            "Family",
                            "Fatherhood",
                            "Friendship",
                            "Marriage",
                            "Motherhood",
                            "Parenting",
                            "Weddings",
                            "Fitness",
                            "Wellness",
                            "Bodybuilding",
                            "Meditation",
                            "Exercise",
                            "Running",
                            "Weight lifting",
                            "Yoga",
                            "Food",
                            "Drinks",
                            "Alcohol",
                            "Beer",
                            "Wine",
                            "Beverages",
                            "Coffee",
                            "Energy drinks",
                            "Juice",
                            "Soft drinks",
                            "Tea",
                            "Cooking",
                            "Baking",
                            "Recipes",
                            "Cuisine",
                            "Chinese food",
                            "French food",
                            "German food",
                            "Greek food",
                            "Indian food",
                            "Spanish cuisine",
                            "Thai cuisine",
                            "Barbecue",
                            "Chocolate",
                            "Desserts",
                            "Fast food",
                            "Organic food",
                            "Pizza",
                            "Seafood",
                            "Vegan",
                            "Vegetarian",
                            "Paleo",
                            "Keto",
                            "Fasting",
                            "Diners",
                            "Arts",
                            "Acting",
                            "Crafts",
                            "Dance",
                            "Drawing",
                            "Drums",
                            "Fine art",
                            "Guitar",
                            "Painting",
                            "Photography",
                            "Sculpture",
                            "Singing",
                            "Writing",
                            "Current events",
                            "Gardening",
                            "DIY",
                            "Furniture",
                            "Gardening",
                            "Home",
                            "Pets",
                            "Birds",
                            "Cats",
                            "Dogs",
                            "Fish",
                            "Horses",
                            "Pet food",
                            "Rabbits",
                            "Reptiles",
                            "Law",
                            "Military",
                            "Politics",
                            "Religion",
                            "Sustainability",
                            "Veterans",
                            "Volunteering",
                            "Travel",
                            "Adventure",
                            "Air travel",
                            "Beaches",
                            "Car rentals",
                            "Cruises",
                            "Ecotourism",
                            "Hotels",
                            "Lakes",
                            "Mountains",
                            "Nature",
                            "Theme parks",
                            "Tourism",
                            "Vacations",
                            "Vehicles",
                            "Automobiles",
                            "Boats",
                            "Hybrids",
                            "Minivans",
                            "Motorcycles",
                            "RVs",
                            "SUVs",
                            "Scooters",
                            "Trucks",
                            "Shopping",
                            "Fashion",
                            "Beauty",
                            "Cosmetics",
                            "Fragrances",
                            "Hairs",
                            "Spas",
                            "Tattoos",
                            "Clothing",
                            "Shoes",
                            "Dresses",
                            "Handbags",
                            "Jewelry",
                            "Sunglasses",
                            "Shopping",
                            "Boutiques",
                            "Coupons",
                            "Toys",
                            "Sports",
                            "Ourdoors",
                            "Boating",
                            "Camping",
                            "Fishing",
                            "Hunting",
                            "Biking",
                            "Hiking",
                            "Surfing",
                            "Sports",
                            "Football",
                            "Soccer",
                            "Formel 1",
                            "Baseball",
                            "Basketball",
                            "Golf",
                            "Marathons",
                            "Skiing",
                            "Snowboarding",
                            "Swimming",
                            "Tennis",
                            "Thriathlons",
                            "Volleyball",
                            "Technology",
                            "Computers",
                            "Free software",
                            "Hard drives",
                            "Networking",
                            "Software",
                            "MERN",
                            "Tablets",
                            "Camcorders",
                            "Cameras",
                            "E-books",
                            "GPS devices",
                            "Game consoles",
                            "Mobile phones",
                            "Projectors",
                            "Smartphones",
                            "Televisions",
                    ],
        }

    dbo.collection("appointments").insertOne(appointments, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });

    dbo.collection("interests").insertOne(shorterInterests, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });

    {/*
      dbo.collection("organizations").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });
    */}
});