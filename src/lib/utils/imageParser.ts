export default (data: string) => {
  const image = data?.match(/\!\[(.*)\)/g);

  if (image) {
    const [imageStrings] = Array.from(image).filter((value) =>
      value.includes("http")
    );
    const thumnail = imageStrings
      .replace(/[(,)]/g, "")
      .replace(/\!(.*)\]/g, "");
    return thumnail.includes("http") ? thumnail : null;
  }

  return null;
};
