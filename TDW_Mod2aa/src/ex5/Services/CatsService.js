const url = "https://api.thecatapi.com/v1/images/search?limit=20";
const key =
  "live_z7gOOuHGrt0KbDdZIm5hx6sdIWM1UNBoQ8L1e8wkXVjeOEI7ErxlW2CGbwRR1hcg";

export const catsService = {
  getAllCats: async (page = 0) => {
    const data = await fetch(url + "&page=" + page + "&api_key=" + key);
    return data.json();
  },
};
