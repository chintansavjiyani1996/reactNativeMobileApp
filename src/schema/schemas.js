export const Restaurants = {
  name: "Restaurants",
  properties: {
    id: 'int',
    title: "string",
    phone_no: "int",
    description: "string",
    rating: { type: 'int', optional: true },
    address: "string",
    city: "string",
    state: "string",
    country: "string",
    pincode: "int",
    long: 'string',
    lat: 'string',
    created_at: { type: 'date', optional: true },
    updated_at: { type: 'date', optional: true },
    img: 'string[]'
  }
};

