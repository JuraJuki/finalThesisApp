import * as actionTypes from "./actionTypes";

export const initImages = () => {
  return dispatch => {
    const token = localStorage.token;
    // if (!token) return [];
    fetch("/api/images", {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then(x => x.json())
      .then(images => {
        dispatch({
          type: actionTypes.INIT_IMAGES,
          images
        });
      });
  };
};

export const initStats = () => {
  return dispatch => {
    const token = localStorage.token;
  };
};

export const removeImage = imageId => {
  if (confirm("Do You really want to delete this image?")) {
    return dispatch => {
      const token = localStorage.token;

      fetch(`/api/images/${imageId}`, {
        method: "delete",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
        .then(x => x.json())
        .then(_ => {
          initImages()(dispatch);
        });
    };
  } else {
    return null;
  }
};
