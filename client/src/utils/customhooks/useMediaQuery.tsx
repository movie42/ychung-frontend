import { useEffect, useState } from "react";

interface IMatchMedia {
  media: string;
  matches: boolean;
  addListener: (params: any) => any;
  removeListener: (params: any) => any;
}

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media: IMatchMedia = window.matchMedia(query);

    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => {
      setMatches(media.matches);
    };
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, query]);
  return matches;
}
