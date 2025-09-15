import { useState, useEffect } from 'react';

export default function useMediaQuery(query = '(min-width: 1024px)') {
  const [value, setValue] = useState(true);

  useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches);
    }

    const result = matchMedia(query);
    result.addEventListener('change', onChange);
    setValue(result.matches);

    return () => result.removeEventListener('change', onChange);
  }, [query]);

  return value;
}
