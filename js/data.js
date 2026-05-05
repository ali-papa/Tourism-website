
// this file contains fake data for destinations

const destinations = [
    {
        id: 1,
        name: "Cairo",
        country: "Egypt",
        category: "Historical",
        price: 1500,
        currency: "USD",
        rating: 4.7,
        image: "../assets/images/place3.jpg",
        shortDescription: "Famous for the Pyramids and the Nile River.",
        description: "Cairo is the capital of Egypt and one of the most famous tourist destinations, known for the Pyramids and the Nile River.",
        gallery: [
            "../assets/images/cairo1.jpg",
            "../assets/images/cairo2.jpg",
            "../assets/images/cairo3.jpg"
        ],
        video: "../assets/videos/cairo.mp4",
        location: {
            address: "Cairo, Egypt",
            mapLink: "https://www.google.com/maps?q=Cairo,Egypt"
        },
        highlights: [
            "Visit the Great Pyramids of Giza",
            "Enjoy a Nile River cruise",
            "Discover museums and ancient history"
        ],
        accessibility: [
            "Wheelchair accessible entrance",
            "Accessible public areas",
            "Elevator available in some attractions"
        ],
        policies: {
            checkIn: "From 3:00 PM",
            checkOut: "Before 12:00 PM",
            pets: "Pets are not allowed",
            children: "Children are welcome"
        },
        nearbyPlaces: [
            "Giza Pyramids",
            "Egyptian Museum",
            "Khan El Khalili"
        ]
    },
    {
        id: 2,
        name: "Dubai",
        country: "UAE",
        category: "City",
        price: 4800,
        currency: "USD",
        rating: 4.8,
        image: "../assets/images/place2.jpg",
        shortDescription: "Modern city famous for luxury shopping and skyscrapers.",
        description: "Dubai is a modern city famous for luxury shopping, skyscrapers, and unique tourist attractions like Burj Khalifa.",
        gallery: [
            "../assets/images/dubai1.jpg",
            "../assets/images/dubai2.jpg",
            "../assets/images/dubai3.jpg"
        ],
        video: "../assets/videos/dubai.mp4",
        location: {
            address: "Dubai, UAE",
            mapLink: "https://www.google.com/maps?q=Dubai,UAE"
        },
        highlights: [
            "Burj Khalifa and luxury malls",
            "Desert safari experiences",
            "Modern entertainment and nightlife"
        ],
        accessibility: [
            "Accessible hotels and malls",
            "Wheelchair-friendly transportation",
            "Elevators in major attractions"
        ],
        policies: {
            checkIn: "From 2:00 PM",
            checkOut: "Before 11:00 AM",
            pets: "Pets depend on hotel policy",
            children: "Children are welcome"
        },
        nearbyPlaces: [
            "Burj Khalifa",
            "Dubai Mall",
            "Palm Jumeirah"
        ]
    },
    {
        id: 3,
        name: "Paris",
        country: "France",
        category: "Romantic",
        price: 4000,
        currency: "USD",
        rating: 4.9,
        image: "../assets/images/place1.jpg",
        shortDescription: "City of love, famous for the Eiffel Tower and art museums.",
        description: "Paris is known as the city of love, famous for the Eiffel Tower, art museums, and beautiful streets.",
        gallery: [
            "../assets/images/paris1.jpg",
            "../assets/images/paris2.jpg",
            "../assets/images/paris3.jpg"
        ],
        video: "../assets/videos/paris.mp4",
        location: {
            address: "Paris, France",
            mapLink: "https://www.google.com/maps?q=Paris,France"
        },
        highlights: [
            "Eiffel Tower views",
            "World-famous museums",
            "Romantic streets and cafes"
        ],
        accessibility: [
            "Accessible metro stations in some areas",
            "Wheelchair access in major museums",
            "Public elevators available"
        ],
        policies: {
            checkIn: "From 3:00 PM",
            checkOut: "Before 12:00 PM",
            pets: "Small pets may be allowed",
            children: "Children are welcome"
        },
        nearbyPlaces: [
            "Eiffel Tower",
            "Louvre Museum",
            "Champs-Élysées"
        ]
    },
    {
        id: 4,
        name: "Rome",
        country: "Italy",
        image: "../assets/images/place4.jpg",
        category: "Historical",
        price: 4200,
        currency: "USD",
        rating: 4.7,
        shortDescription: "Ancient Roman Empire architecture.",
        description: "Rome is famous for the Colosseum and ancient Roman architecture.",
        gallery: [
            "../assets/images/rome1.jpg",
            "../assets/images/rome2.jpg",
            "../assets/images/rome3.jpg"
        ],
        video: "../assets/videos/rome.mp4",
        location: {
            address: "Rome, Italy",
            mapLink: "https://www.google.com/maps?q=Rome,Italy"
        },
        highlights: [
            "Ancient ruins and landmarks",
            "Famous Italian food",
            "Rich historical atmosphere"
        ],
        accessibility: [
            "Accessible tourist buses",
            "Some historical sites offer wheelchair access",
            "Public transport support available"
        ],
        policies: {
            checkIn: "From 2:00 PM",
            checkOut: "Before 11:00 AM",
            pets: "Pets may be allowed",
            children: "Children are welcome"
        },
        nearbyPlaces: [
            "Colosseum",
            "Trevi Fountain",
            "Roman Forum"
        ]
    },
    {
        id: 5,
        name: "Istanbul",
        country: "Turkey",
        image: "../assets/images/place5.jpg",
        category: "Cultural",
        price: 2800,
        currency: "USD",
        rating: 4.6,
        shortDescription: "A mix of Europe and Asia culture.",
        description: "Istanbul is a unique city that blends European and Asian culture.",
        gallery: [
            "../assets/images/istanbul1.jpg",
            "../assets/images/istanbul2.jpg",
            "../assets/images/istanbul3.jpg"
        ],
        video: "../assets/videos/istanbul.mp4",
        location: {
            address: "Istanbul, Turkey",
            mapLink: "https://www.google.com/maps?q=Istanbul,Turkey"
        },
        highlights: [
            "Historic mosques and bazaars",
            "Bosporus views",
            "Blend of cultures and food"
        ],
        accessibility: [
            "Some tram lines are accessible",
            "Accessible hotels available",
            "Support services in tourist zones"
        ],
        policies: {
            checkIn: "From 2:00 PM",
            checkOut: "Before 12:00 PM",
            pets: "Depends on hotel policy",
            children: "Children are welcome"
        },
        nearbyPlaces: [
            "Hagia Sophia",
            "Blue Mosque",
            "Grand Bazaar"
        ]
    },
    {
        id: 6,
        name: "Tokyo",
        country: "Japan",
        image: "../assets/images/place6.jpg",
        category: "Modern",
        price: 6500,
        currency: "USD",
        rating: 4.9,
        shortDescription: "Technology, anime culture, and neon city.",
        description: "Tokyo is known for technology, anime culture, and vibrant city life.",
        gallery: [
            "../assets/images/tokyo1.jpg",
            "../assets/images/tokyo2.jpg",
            "../assets/images/tokyo3.jpg"
        ],
        video: "../assets/videos/tokyo.mp4",
        location: {
            address: "Tokyo, Japan",
            mapLink: "https://www.google.com/maps?q=Tokyo,Japan"
        },
        highlights: [
            "Anime and gaming culture",
            "Advanced technology and transport",
            "Amazing city lights and shopping"
        ],
        accessibility: [
            "Highly accessible metro system",
            "Wheelchair-friendly stations",
            "Accessible hotels and malls"
        ],
        policies: {
            checkIn: "From 3:00 PM",
            checkOut: "Before 11:00 AM",
            pets: "Pets usually not allowed",
            children: "Children are welcome"
        },
        nearbyPlaces: [
            "Shibuya Crossing",
            "Tokyo Tower",
            "Akihabara"
        ]
    },
    {
        id: 7,
        name: "London",
        country: "UK",
        image: "../assets/images/place7.jpg",
        category: "Urban",
        price: 5200,
        currency: "USD",
        rating: 4.8,
        shortDescription: "Big Ben, history, and royal culture.",
        description: "London is famous for Big Ben, royal landmarks, and rich history.",
        gallery: [
            "../assets/images/london1.jpg",
            "../assets/images/london2.jpg",
            "../assets/images/london3.jpg"
        ],
        video: "../assets/videos/london.mp4",
        location: {
            address: "London, UK",
            mapLink: "https://www.google.com/maps?q=London,UK"
        },
        highlights: [
            "Royal palaces and landmarks",
            "Museums and historic streets",
            "Excellent shopping and parks"
        ],
        accessibility: [
            "Accessible buses and underground stations",
            "Wheelchair-friendly museums",
            "Step-free access in many areas"
        ],
        policies: {
            checkIn: "From 3:00 PM",
            checkOut: "Before 11:00 AM",
            pets: "Depends on hotel policy",
            children: "Children are welcome"
        },
        nearbyPlaces: [
            "Big Ben",
            "London Eye",
            "Buckingham Palace"
        ]
    },
    {
        id: 8,
        name: "New York",
        country: "USA",
        image: "../assets/images/place8.jpg",
        category: "Urban",
        price: 6000,
        currency: "USD",
        rating: 4.9,
        shortDescription: "Times Square and Statue of Liberty.",
        description: "New York is famous for Times Square, the Statue of Liberty, and skyscrapers.",
        gallery: [
            "../assets/images/newyork1.jpg",
            "../assets/images/newyork2.jpg",
            "../assets/images/newyork3.jpg"
        ],
        video: "../assets/videos/newyork.mp4",
        location: {
            address: "New York, USA",
            mapLink: "https://www.google.com/maps?q=New+York,USA"
        },
        highlights: [
            "Times Square lights",
            "Broadway and entertainment",
            "Famous skyline and landmarks"
        ],
        accessibility: [
            "Accessible taxis and public transport",
            "Wheelchair access in many attractions",
            "Accessible sidewalks and crossings"
        ],
        policies: {
            checkIn: "From 4:00 PM",
            checkOut: "Before 11:00 AM",
            pets: "Some hotels allow pets",
            children: "Children are welcome"
        },
        nearbyPlaces: [
            "Times Square",
            "Statue of Liberty",
            "Central Park"
        ]
    },
    {
        id: 9,
        name: "Barcelona",
        country: "Spain",
        image: "../assets/images/place9.jpg",
        category: "Coastal",
        price: 4000,
        currency: "USD",
        rating: 4.7,
        shortDescription: "Beaches and unique Gaudi architecture.",
        description: "Barcelona is known for beaches and unique Gaudi architecture.",
        gallery: [
            "../assets/images/barcelona1.jpg",
            "../assets/images/barcelona2.jpg",
            "../assets/images/barcelona3.jpg"
        ],
        video: "../assets/videos/barcelona.mp4",
        location: {
            address: "Barcelona, Spain",
            mapLink: "https://www.google.com/maps?q=Barcelona,Spain"
        },
        highlights: [
            "Beautiful beaches",
            "Famous Gaudi architecture",
            "Vibrant nightlife and food"
        ],
        accessibility: [
            "Accessible beach areas",
            "Public elevators available",
            "Wheelchair-friendly attractions"
        ],
        policies: {
            checkIn: "From 3:00 PM",
            checkOut: "Before 12:00 PM",
            pets: "Depends on accommodation",
            children: "Children are welcome"
        },
        nearbyPlaces: [
            "Sagrada Familia",
            "Park Güell",
            "La Rambla"
        ]
    },
    {
        id: 10,
        name: "Athens",
        country: "Greece",
        image: "../assets/images/place10.jpg",
        category: "Historical",
        price: 3500,
        currency: "USD",
        rating: 4.6,
        shortDescription: "Birthplace of ancient civilization.",
        description: "Athens is the birthplace of ancient civilization and Greek history.",
        gallery: [
            "../assets/images/athens1.jpg",
            "../assets/images/athens2.jpg",
            "../assets/images/athens3.jpg"
        ],
        video: "../assets/videos/athens.mp4",
        location: {
            address: "Athens, Greece",
            mapLink: "https://www.google.com/maps?q=Athens,Greece"
        },
        highlights: [
            "Ancient temples and ruins",
            "Greek history and museums",
            "Mediterranean atmosphere"
        ],
        accessibility: [
            "Accessible metro options",
            "Wheelchair access at major sites",
            "Tourist assistance available"
        ],
        policies: {
            checkIn: "From 2:00 PM",
            checkOut: "Before 11:00 AM",
            pets: "Small pets may be allowed",
            children: "Children are welcome"
        },
        nearbyPlaces: [
            "Acropolis",
            "Parthenon",
            "Plaka"
        ]
    },
    {
        id: 11,
        name: "Amsterdam",
        country: "Netherlands",
        image: "../assets/images/place11.jpg",
        category: "Cultural",
        price: 3700,
        currency: "USD",
        rating: 4.7,
        shortDescription: "Canals, bikes, and artistic vibe.",
        description: "Amsterdam is known for canals, bikes, and its artistic atmosphere.",
        gallery: [
            "../assets/images/amsterdam1.jpg",
            "../assets/images/amsterdam2.jpg",
            "../assets/images/amsterdam3.jpg"
        ],
        video: "../assets/videos/amsterdam.mp4",
        location: {
            address: "Amsterdam, Netherlands",
            mapLink: "https://www.google.com/maps?q=Amsterdam,Netherlands"
        },
        highlights: [
            "Canal cruises",
            "Art museums and galleries",
            "Relaxed cultural atmosphere"
        ],
        accessibility: [
            "Accessible museums",
            "Wheelchair support in transport",
            "Tourist-friendly public spaces"
        ],
        policies: {
            checkIn: "From 3:00 PM",
            checkOut: "Before 11:00 AM",
            pets: "Depends on property",
            children: "Children are welcome"
        },
        nearbyPlaces: [
            "Van Gogh Museum",
            "Anne Frank House",
            "Dam Square"
        ]
    },
    {
        id: 12,
        name: "Zurich",
        country: "Switzerland",
        image: "../assets/images/place12.jpg",
        category: "Nature",
        price: 7000,
        currency: "USD",
        rating: 4.8,
        shortDescription: "Mountains, lakes, and luxury lifestyle.",
        description: "Zurich is known for mountains, lakes, and luxury lifestyle.",
        gallery: [
            "../assets/images/zurich1.jpg",
            "../assets/images/zurich2.jpg",
            "../assets/images/zurich3.jpg"
        ],
        video: "../assets/videos/zurich.mp4",
        location: {
            address: "Zurich, Switzerland",
            mapLink: "https://www.google.com/maps?q=Zurich,Switzerland"
        },
        highlights: [
            "Beautiful lakes and mountains",
            "Luxury shopping",
            "Clean and quiet atmosphere"
        ],
        accessibility: [
            "Accessible transport network",
            "Wheelchair-friendly public areas",
            "Elevators in main attractions"
        ],
        policies: {
            checkIn: "From 3:00 PM",
            checkOut: "Before 11:00 AM",
            pets: "Pets may be allowed",
            children: "Children are welcome"
        },
        nearbyPlaces: [
            "Lake Zurich",
            "Old Town",
            "Bahnhofstrasse"
        ]
    },
    {
        id: 13,
        name: "Bangkok",
        country: "Thailand",
        image: "../assets/images/place13.jpg",
        category: "Cultural",
        price: 3200,
        currency: "USD",
        rating: 4.6,
        shortDescription: "Temples, markets, and street food.",
        description: "Bangkok is famous for temples, local markets, and street food.",
        gallery: [
            "../assets/images/bangkok1.jpg",
            "../assets/images/bangkok2.jpg",
            "../assets/images/bangkok3.jpg"
        ],
        video: "../assets/videos/bangkok.mp4",
        location: {
            address: "Bangkok, Thailand",
            mapLink: "https://www.google.com/maps?q=Bangkok,Thailand"
        },
        highlights: [
            "Street food and floating markets",
            "Historic temples",
            "Vibrant nightlife"
        ],
        accessibility: [
            "Accessible shopping centers",
            "Wheelchair-friendly hotels",
            "Support in tourist areas"
        ],
        policies: {
            checkIn: "From 2:00 PM",
            checkOut: "Before 12:00 PM",
            pets: "Pets usually not allowed",
            children: "Children are welcome"
        },
        nearbyPlaces: [
            "Grand Palace",
            "Wat Arun",
            "Chatuchak Market"
        ]
    },
    {
        id: 14,
        name: "Sydney",
        country: "Australia",
        image: "../assets/images/place14.jpg",
        category: "Coastal",
        price: 8000,
        currency: "USD",
        rating: 4.9,
        shortDescription: "Opera House and beautiful beaches.",
        description: "Sydney is famous for the Opera House and beautiful beaches.",
        gallery: [
            "../assets/images/sydney1.jpg",
            "../assets/images/sydney2.jpg",
            "../assets/images/sydney3.jpg"
        ],
        video: "../assets/videos/sydney.mp4",
        location: {
            address: "Sydney, Australia",
            mapLink: "https://www.google.com/maps?q=Sydney,Australia"
        },
        highlights: [
            "Sydney Opera House",
            "Beautiful coastal views",
            "Relaxing beaches"
        ],
        accessibility: [
            "Accessible ferry and train services",
            "Wheelchair-friendly beaches",
            "Accessible landmarks"
        ],
        policies: {
            checkIn: "From 3:00 PM",
            checkOut: "Before 10:00 AM",
            pets: "Depends on property",
            children: "Children are welcome"
        },
        nearbyPlaces: [
            "Opera House",
            "Bondi Beach",
            "Harbour Bridge"
        ]
    },
    {
        id: 15,
        name: "Rio de Janeiro",
        country: "Brazil",
        image: "../assets/images/place15.jpg",
        category: "Nature",
        price: 7500,
        currency: "USD",
        rating: 4.8,
        shortDescription: "Christ the Redeemer and carnival city.",
        description: "Rio de Janeiro is famous for Christ the Redeemer and carnival celebrations.",
        gallery: [
            "../assets/images/rio1.jpg",
            "../assets/images/rio2.jpg",
            "../assets/images/rio3.jpg"
        ],
        video: "../assets/videos/rio.mp4",
        location: {
            address: "Rio de Janeiro, Brazil",
            mapLink: "https://www.google.com/maps?q=Rio+de+Janeiro,Brazil"
        },
        highlights: [
            "Carnival celebrations",
            "Beautiful mountains and beaches",
            "Iconic Christ the Redeemer statue"
        ],
        accessibility: [
            "Accessible tourist transport",
            "Wheelchair-friendly hotels",
            "Assistance available in attractions"
        ],
        policies: {
            checkIn: "From 2:00 PM",
            checkOut: "Before 12:00 PM",
            pets: "Depends on hotel policy",
            children: "Children are welcome"
        },
        nearbyPlaces: [
            "Christ the Redeemer",
            "Copacabana Beach",
            "Sugarloaf Mountain"
        ]
    }
];
const hotelsByDestination = {
    1: [
        {
            name: "Nile View Hotel",
            image: "../assets/images/hotel-cairo1.jpg",
            rating: 4.6,
            price: 120,
            currency: "USD",
            location: "Downtown Cairo",
            features: ["Free WiFi", "Nile view", "Breakfast included"]
        },
        {
            name: "Pyramids Palace Hotel",
            image: "../assets/images/hotel-cairo2.jpg",
            rating: 4.8,
            price: 180,
            currency: "USD",
            location: "Giza, Cairo",
            features: ["Near Pyramids", "Pool", "Airport shuttle"]
        }
    ],

    2: [
        {
            name: "Dubai Marina Hotel",
            image: "../assets/images/hotel-dubai1.jpg",
            rating: 4.7,
            price: 250,
            currency: "USD",
            location: "Dubai Marina",
            features: ["Sea view", "Free WiFi", "Luxury rooms"]
        },
        {
            name: "Burj View Suites",
            image: "../assets/images/hotel-dubai2.jpg",
            rating: 4.9,
            price: 320,
            currency: "USD",
            location: "Downtown Dubai",
            features: ["Burj Khalifa view", "Pool", "Spa"]
        }
    ],

    3: [
        {
            name: "Eiffel Comfort Hotel",
            image: "../assets/images/hotel-paris1.jpg",
            rating: 4.8,
            price: 210,
            currency: "USD",
            location: "Near Eiffel Tower",
            features: ["City view", "Free WiFi", "Romantic rooms"]
        },
        {
            name: "Paris Central Stay",
            image: "../assets/images/hotel-paris2.jpg",
            rating: 4.6,
            price: 170,
            currency: "USD",
            location: "Central Paris",
            features: ["Near metro", "Breakfast", "Family rooms"]
        }
    ],

    4: [
        {
            name: "Colosseum Grand Hotel",
            image: "../assets/images/hotel-rome1.jpg",
            rating: 4.7,
            price: 190,
            currency: "USD",
            location: "Near Colosseum",
            features: ["Historic area", "Free WiFi", "Restaurant"]
        },
        {
            name: "Rome Classic Inn",
            image: "../assets/images/hotel-rome2.jpg",
            rating: 4.5,
            price: 150,
            currency: "USD",
            location: "Rome City Center",
            features: ["Breakfast included", "City tours", "Airport shuttle"]
        }
    ],

    5: [
        {
            name: "Bosphorus View Hotel",
            image: "../assets/images/hotel-istanbul1.jpg",
            rating: 4.7,
            price: 140,
            currency: "USD",
            location: "Bosphorus, Istanbul",
            features: ["Sea view", "Free WiFi", "Restaurant"]
        },
        {
            name: "Old City Istanbul Hotel",
            image: "../assets/images/hotel-istanbul2.jpg",
            rating: 4.6,
            price: 110,
            currency: "USD",
            location: "Sultanahmet",
            features: ["Near Blue Mosque", "Breakfast", "Family rooms"]
        }
    ],

    6: [
        {
            name: "Tokyo Grand Hotel",
            image: "../assets/images/hotel-tokyo1.jpg",
            rating: 4.8,
            price: 220,
            currency: "USD",
            location: "Shinjuku, Tokyo",
            features: ["Free WiFi", "Near metro station", "City view"]
        },
        {
            name: "Sakura Stay Hotel",
            image: "../assets/images/hotel-tokyo2.jpg",
            rating: 4.6,
            price: 180,
            currency: "USD",
            location: "Shibuya, Tokyo",
            features: ["Modern rooms", "Family rooms", "Restaurant"]
        }
    ],

    7: [
        {
            name: "London Royal Hotel",
            image: "../assets/images/hotel-london1.jpg",
            rating: 4.8,
            price: 230,
            currency: "USD",
            location: "Westminster, London",
            features: ["Near Big Ben", "Free WiFi", "Breakfast"]
        },
        {
            name: "Thames River Hotel",
            image: "../assets/images/hotel-london2.jpg",
            rating: 4.7,
            price: 200,
            currency: "USD",
            location: "Near River Thames",
            features: ["River view", "Restaurant", "Airport shuttle"]
        }
    ],

    8: [
        {
            name: "Times Square Hotel",
            image: "../assets/images/hotel-newyork1.jpg",
            rating: 4.8,
            price: 260,
            currency: "USD",
            location: "Times Square, New York",
            features: ["City center", "Free WiFi", "Gym"]
        },
        {
            name: "Central Park Suites",
            image: "../assets/images/hotel-newyork2.jpg",
            rating: 4.7,
            price: 240,
            currency: "USD",
            location: "Near Central Park",
            features: ["Park view", "Family rooms", "Restaurant"]
        }
    ],

    9: [
        {
            name: "Barcelona Beach Hotel",
            image: "../assets/images/hotel-barcelona1.jpg",
            rating: 4.7,
            price: 190,
            currency: "USD",
            location: "Barceloneta Beach",
            features: ["Beach access", "Free WiFi", "Sea view"]
        },
        {
            name: "Gaudi Art Hotel",
            image: "../assets/images/hotel-barcelona2.jpg",
            rating: 4.6,
            price: 160,
            currency: "USD",
            location: "Near Sagrada Familia",
            features: ["City tours", "Breakfast", "Modern rooms"]
        }
    ],

    10: [
        {
            name: "Acropolis View Hotel",
            image: "../assets/images/hotel-athens1.jpg",
            rating: 4.7,
            price: 150,
            currency: "USD",
            location: "Near Acropolis",
            features: ["Acropolis view", "Free WiFi", "Breakfast"]
        },
        {
            name: "Athens Classic Stay",
            image: "../assets/images/hotel-athens2.jpg",
            rating: 4.5,
            price: 130,
            currency: "USD",
            location: "Athens City Center",
            features: ["Near metro", "Family rooms", "Restaurant"]
        }
    ],

    11: [
        {
            name: "Amsterdam Canal Hotel",
            image: "../assets/images/hotel-amsterdam1.jpg",
            rating: 4.7,
            price: 180,
            currency: "USD",
            location: "Canal District",
            features: ["Canal view", "Free WiFi", "Bike rental"]
        },
        {
            name: "Museum Square Hotel",
            image: "../assets/images/hotel-amsterdam2.jpg",
            rating: 4.6,
            price: 160,
            currency: "USD",
            location: "Near Museum Square",
            features: ["Near museums", "Breakfast", "Quiet rooms"]
        }
    ],

    12: [
        {
            name: "Zurich Lake Hotel",
            image: "../assets/images/hotel-zurich1.jpg",
            rating: 4.8,
            price: 300,
            currency: "USD",
            location: "Near Lake Zurich",
            features: ["Lake view", "Luxury rooms", "Free WiFi"]
        },
        {
            name: "Swiss Mountain Stay",
            image: "../assets/images/hotel-zurich2.jpg",
            rating: 4.7,
            price: 280,
            currency: "USD",
            location: "Zurich Old Town",
            features: ["Mountain view", "Breakfast", "Spa"]
        }
    ],

    13: [
        {
            name: "Bangkok Palace Hotel",
            image: "../assets/images/hotel-bangkok1.jpg",
            rating: 4.6,
            price: 100,
            currency: "USD",
            location: "Central Bangkok",
            features: ["Free WiFi", "Pool", "Near markets"]
        },
        {
            name: "Temple View Hotel",
            image: "../assets/images/hotel-bangkok2.jpg",
            rating: 4.5,
            price: 90,
            currency: "USD",
            location: "Old Bangkok",
            features: ["Near temples", "Breakfast", "Restaurant"]
        }
    ],

    14: [
        {
            name: "Sydney Harbour Hotel",
            image: "../assets/images/hotel-sydney1.jpg",
            rating: 4.9,
            price: 320,
            currency: "USD",
            location: "Sydney Harbour",
            features: ["Opera House view", "Free WiFi", "Luxury rooms"]
        },
        {
            name: "Bondi Beach Resort",
            image: "../assets/images/hotel-sydney2.jpg",
            rating: 4.7,
            price: 260,
            currency: "USD",
            location: "Bondi Beach",
            features: ["Beach access", "Pool", "Restaurant"]
        }
    ],

    15: [
        {
            name: "Copacabana Beach Hotel",
            image: "../assets/images/hotel-rio1.jpg",
            rating: 4.8,
            price: 230,
            currency: "USD",
            location: "Copacabana Beach",
            features: ["Beach view", "Free WiFi", "Pool"]
        },
        {
            name: "Rio Mountain View Hotel",
            image: "../assets/images/hotel-rio2.jpg",
            rating: 4.7,
            price: 210,
            currency: "USD",
            location: "Near Sugarloaf Mountain",
            features: ["Mountain view", "Breakfast", "City tours"]
        }
    ]
};