// storage - godown
const store = configureStore({
  reducer: {
    jobs: jobReducer,
  },
});
export default store;
