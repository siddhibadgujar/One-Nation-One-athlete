import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type UIState = { enable3D: boolean; highContrast: boolean; largeFont: boolean; toggle3D: () => void; toggleContrast: () => void; toggleLargeFont: () => void };

const Ctx = createContext<UIState | null>(null);

export const UIProvider: React.FC<{ children: any }> = ({ children }) => {
  const [enable3D, setEnable3D] = useState(() => (import.meta.env.VITE_ENABLE_3D !== 'false'));
  const [highContrast, setHighContrast] = useState(false);
  const [largeFont, setLargeFont] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('high-contrast', highContrast);
  }, [highContrast]);
  useEffect(() => {
    document.documentElement.classList.toggle('large-font', largeFont);
  }, [largeFont]);

  const value = useMemo(
    () => ({
      enable3D,
      highContrast,
      largeFont,
      toggle3D: () => setEnable3D((v) => !v),
      toggleContrast: () => setHighContrast((v) => !v),
      toggleLargeFont: () => setLargeFont((v) => !v),
    }),
    [enable3D, highContrast, largeFont]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const useUI = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('UIProvider missing');
  return ctx;
};
