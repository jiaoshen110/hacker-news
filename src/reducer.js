import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from "./actions";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, isLoading: true };
    case SET_STORIES:
      return {
        ...state,
        isLoading: false,
        hits: action.playload.hits,
        nbPages: action.playload.nbPages,
      };
    case REMOVE_STORY:
      return {
        ...state,
        hits: state.hits.filter(
          (story) => story.objectID !== action.playload.id
        ),
      };
    case HANDLE_SEARCH:
      return { ...state, query: action.playload.query, page: 0 };
    case HANDLE_PAGE:
      if (action.playload.value === "inc" && state.page + 1 < state.nbPages) {
        return { ...state, page: state.page + 1 };
      } else if (action.playload.value === "dec" && state.page - 1 >= 0) {
        return { ...state, page: state.page - 1 };
      } else if (action.playload.value === "dec" && state.page === 0) {
        return { ...state, page: state.nbPages - 1 };
      } else {
        return { ...state, page: 0 };
      }
    default:
      throw new Error(`no matching ${action.type} action`);
  }
};
export default reducer;
