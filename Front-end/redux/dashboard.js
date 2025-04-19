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
        let removed = false;
        const result = favoriteCourse.filter((ele) => {
          if (ele.id === payload.id) {
            removed = true;
          }
          return ele.id !== payload.id;
        });
        if (removed) {
          state.favoriteCourse = result;
        } else {
          state.favoriteCourse = [...favoriteCourse, payload];
        }
      } catch (error) {
        console.log(error);
      }
    },
    deleteCourse: (state, { payload }) => {
      try {
        const { courses } = state;
        state.courses = courses.map((ele) => {
          if (ele.id === payload) return { ...ele, visible: false };
          return ele;
        });
      } catch (error) {
        console.log(error);
      }
    },
    addCourse: (state, { payload }) => {
      try {
        const { courses } = state;
        state.courses = courses.map((ele) => {
          if (ele.id === payload) return { ...ele, visible: true };
          return ele;
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
});
export const {
  toggleFavorite,
  initCourses,
  deleteCourse,addCourse,
  initFavCourses,
  initWishlistCourses,
} = dashboard.actions;
export default dashboard.reducer;
