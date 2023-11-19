import { useEffect, useState } from "react";

export const useShouldHydrate = () => {
  const [shouldHydrate, setShouldHydrate] = useState(false);

  useEffect(() => {
    setShouldHydrate(true);
  }, []);

  return { shouldHydrate };
};
