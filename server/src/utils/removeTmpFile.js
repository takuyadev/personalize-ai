import fs from "fs";

// @desc Removes specified temp uploaded file via provided path

export const removeTmpFile = (path) => {
  // After awating for response, remove tmp file
  fs.unlink(path, (err) => {
    // If error, return error json to client
    if (err) {
      return err;
    }
  });
};
