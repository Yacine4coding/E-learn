const { configureStore } = require("@reduxjs/toolkit");
import user from "@/redux/user.js";

const store = configureStore({
  reducer: {
    user
  },
});

export default store ;