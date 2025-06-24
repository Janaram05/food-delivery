const restaurants = [
  {
    name: "Pizza Palace",
    description: "Best Italian pizzas in town",
    address: "123 MG Road, Chennai",
    city: "Chennai",
    imageUrl: "/images/pizza.jpg",
    rating: 4.5,
    cuisine: "Italian, Fast Food",
    menu: [
      { name: "Margherita Pizza", description: "Classic cheese & tomato", price: 249, imageUrl: "/images/pizza.jpg" },
      { name: "Pepperoni Pizza", description: "Pepperoni, cheese, tomato", price: 299, imageUrl: "/images/pizza.jpg" },
      { name: "Veggie Pizza", description: "Peppers, onions, olives", price: 269, imageUrl: "/images/pizza.jpg" }
    ]
  },
  {
    name: "Burger Hub",
    description: "Juicy burgers and crispy fries",
    address: "45 Anna Salai, Chennai",
    city: "Chennai",
    imageUrl: "/images/burger.jpg",
    rating: 4.2,
    cuisine: "American, Fast Food",
    menu: [
      { name: "Classic Burger", description: "Beef patty, cheese, lettuce", price: 199, imageUrl: "/images/burger.jpg" },
      { name: "Chicken Burger", description: "Grilled chicken, mayo, lettuce", price: 189, imageUrl: "/images/burger.jpg" },
      { name: "Veggie Burger", description: "Veg patty, cheese, tomato", price: 179, imageUrl: "/images/burger.jpg" }
    ]
  },
  {
    name: "Sushi World",
    description: "Fresh sushi and Japanese delights",
    address: "88 OMR, Chennai",
    city: "Chennai",
    imageUrl: "/images/sushi.jpg",
    rating: 4.7,
    cuisine: "Japanese, Sushi",
    menu: [
      { name: "Salmon Sushi", description: "Fresh salmon on rice", price: 349, imageUrl: "/images/sushi.jpg" },
      { name: "Veg Sushi Roll", description: "Cucumber, avocado, rice", price: 229, imageUrl: "/images/sushi.jpg" },
      { name: "Prawn Tempura Roll", description: "Crispy prawn, rice, nori", price: 369, imageUrl: "/images/sushi.jpg" }
    ]
  },
  {
    name: "Green Bowl",
    description: "Healthy salads and more",
    address: "12 T Nagar, Chennai",
    city: "Chennai",
    imageUrl: "/images/salad.jpg",
    rating: 4.3,
    cuisine: "Salads, Healthy",
    menu: [
      { name: "Caesar Salad", description: "Lettuce, parmesan, croutons", price: 159, imageUrl: "/images/salad.jpg" },
      { name: "Greek Salad", description: "Feta, olives, cucumber", price: 179, imageUrl: "/images/salad.jpg" },
      { name: "Quinoa Bowl", description: "Quinoa, veggies, lemon", price: 199, imageUrl: "/images/salad.jpg" }
    ]
  }
];

export default restaurants; 