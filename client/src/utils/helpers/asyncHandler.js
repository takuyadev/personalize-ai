export const asyncHandler = async (cb) => {
  try {
    await cb();
  } catch (err) {
    console.error(err);
  }
};
