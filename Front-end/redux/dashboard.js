const { createSlice } = require("@reduxjs/toolkit");

const dashboard = createSlice({
  initialState: {
    courses: [],
    favoriteCourse: [],
    wishlistCourse: [],
  },
  name: "dashboard",
  reducers: {
    initCourses: (state, { payload: courses }) => {
      state.courses = courses;
    },
    initFavCourses: (state, { payload: courses }) => {
      state.favoriteCourse = courses;
    },
    initWishlistCourses: (state, { payload: courses }) => {
      state.wishlistCourse = courses;
    },
    toggleFavorite: (state, { payload }) => {
      try {
        const { favoriteCourse } = state;
        console.log("favoriteCourse")
        console.log(state.favoriteCourse)
        let removed = false;
        const result = favoriteCourse.filter((ele) => {
          if (ele.id === payload.id) {
            removed = true;
            console.log("enter")
          }
          return ele.id !== payload.id;
        });
        if (removed) {
          state.favoriteCourse = result;
        } else {
          state.favoriteCourse = [...favoriteCourse, payload];
          console.log("state.favoriteCourse");
          console.log(state.favoriteCourse);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});
export const {
  toggleFavorite,
  initCourses,
  initFavCourses,
  initWishlistCourses,
} = dashboard.actions;
export default dashboard.reducer;
