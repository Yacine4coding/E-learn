const { createSlice } = require("@reduxjs/toolkit");

const dashboard = createSlice({
  initialState: {
    courses: [],
  },
  name: "dashboard",
  reducers: {
    initCourses: (state, { payload: courses }) => {
      state.courses = courses
      // state = { courses };
    },
    toggleFavorite: (state, { payload }) => {
      const { courses } = state;
      const result = courses.map((ele) => {
        if (ele.courseId === payload) ele.isFavorite = !ele.isFavorite;
        return ele;
      });
      state.courses = result
    },
  },
});
export const { toggleFavorite, initCourses } = dashboard.actions;
export default dashboard.reducer;
