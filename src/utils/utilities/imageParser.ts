export const imageParser = (data: string) => {
  const image = data?.match(/\!(.*)\)/g);

  if (image) {
    const [imageStrings] = Array.from(image).filter((value) =>
      value.includes("https")
    );
    const thumnail = imageStrings
      .replace(/[(,)]/g, "")
      .replace(/\!(.*)\]/g, "");
    return thumnail.includes("https") ? thumnail : null;
  }
  return null;
};
