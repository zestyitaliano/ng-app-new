import React, { Suspense, lazy, useState, useEffect, useCallback, useRef } from 'react';
import { Color, AppView } from './types';
import { generatePalette, createColorObject } from './utils/colorUtils';
import Header from './components/Header';
import ColorPalette from './components/ColorPalette';

const MockupVisualizer = lazy(() => import('./components/MockupVisualizer'));
const TrendingPage = lazy(() => import('./components/TrendingPage'));
const GradientPage = lazy(() => import('./components/GradientPage'));
const ImageRecolorPage = lazy(() => import('./components/ImageRecolorPage'));

interface HistoryState {
  palette: Color[];
  harmony: string | null;
}

export default function ColorPaletteGeneratorTool() {
  const [palette, setPalette] = useState<Color[]>([]);
  const [harmony, setHarmony] = useState<string | null>(null);
  const [appView, setAppView] = useState<AppView>(AppView.Palette);
  const [baseColorForContrast, setBaseColorForContrast] = useState<string | null>(null);
  const [favoritePalettes, setFavoritePalettes] = useState<string[][]>([]);
  
  // Transition State for Shutter Effect
  const [previousPalette, setPreviousPalette] = useState<Color[]>([]);
  const [transitionId, setTransitionId] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Undo/Redo State
  const [past, setPast] = useState<HistoryState[]>([]);
  const [future, setFuture] = useState<HistoryState[]>([]);

  const initialPaletteGenerated = useRef(false);

  // Load data from localStorage on initial render
  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem('favoritePalettes');
      if (savedFavorites) {
        setFavoritePalettes(JSON.parse(savedFavorites));
      }
    } catch (e) {
      console.error("Failed to load local storage data", e);
    }
  }, []);

  // Persist data to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('favoritePalettes', JSON.stringify(favoritePalettes));
    } catch (e) {
      console.error("Failed to save favorite palettes", e);
    }
  }, [favoritePalettes]);

  // Helper to update state with history tracking
  const updatePaletteState = useCallback((newPalette: Color[], newHarmony: string | null, skipHistory: boolean = false) => {
      if (!skipHistory) {
          setPast(prev => {
              const newPast = [...prev, { palette, harmony }];
              return newPast.length > 3 ? newPast.slice(newPast.length - 3) : newPast;
          });
          setFuture([]);
      }
      setPalette(newPalette);
      setHarmony(newHarmony);
  }, [palette, harmony]);

  // Trigger state update and force remount for transition
  const animatePaletteUpdate = useCallback((updateAction: () => void) => {
      if (isTransitioning) return;

      setIsTransitioning(true);
      setPreviousPalette(palette);
      setTransitionId(prev => prev + 1);
      updateAction();
  }, [palette, isTransitioning]);

  const handleUndo = useCallback(() => {
      if (past.length === 0) return;

      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);

      animatePaletteUpdate(() => {
          setFuture(prev => [{ palette, harmony }, ...prev]);
          setPalette(previous.palette);
          setHarmony(previous.harmony);
          setPast(newPast);
          setBaseColorForContrast(null);
      });
  }, [past, palette, harmony, animatePaletteUpdate]);

  const handleRedo = useCallback(() => {
      if (future.length === 0) return;

      const next = future[0];
      const newFuture = future.slice(1);

      animatePaletteUpdate(() => {
          setPast(prev => {
              const newPast = [...prev, { palette, harmony }];
              return newPast.length > 3 ? newPast.slice(newPast.length - 3) : newPast;
          });
          setPalette(next.palette);
          setHarmony(next.harmony);
          setFuture(newFuture);
          setBaseColorForContrast(null);
      });
  }, [future, palette, harmony, animatePaletteUpdate]);

  // Callback to clean up previous palette AFTER animation completes
  const handleTransitionComplete = useCallback(() => {
      setPreviousPalette([]);
      setIsTransitioning(false);
  }, []);

  const createNewPalette = useCallback((specificHarmony?: string) => {
    animatePaletteUpdate(() => {
        const { palette: newPalette, harmony: newHarmony } = generatePalette(palette, specificHarmony);
        updatePaletteState(newPalette, newHarmony);
        setBaseColorForContrast(null); 
    });
  }, [palette, updatePaletteState, animatePaletteUpdate]);

  useEffect(() => {
    if (!initialPaletteGenerated.current) {
        const { palette: newPalette, harmony: newHarmony } = generatePalette([]);
        setPalette(newPalette);
        setHarmony(newHarmony);
        initialPaletteGenerated.current = true;
    }
  }, []);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    const activeElement = document.activeElement;
    const isInputActive = activeElement?.tagName === 'INPUT' || activeElement?.tagName === 'TEXTAREA';

    if (event.code === 'Space' && !isInputActive && appView === AppView.Palette) {
      event.preventDefault();
      createNewPalette();
    }
    
    if ((event.metaKey || event.ctrlKey) && event.key === 'z' && !isInputActive) {
        event.preventDefault();
        if (event.shiftKey) {
            handleRedo();
        } else {
            handleUndo();
        }
    }
  }, [createNewPalette, handleUndo, handleRedo, appView]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);
  
  const handleToggleLock = (hex: string) => {
    const newPalette = palette.map(color =>
        color.hex === hex ? { ...color, isLocked: !color.isLocked } : color
    );
    updatePaletteState(newPalette, harmony);
  };

  const handleUpdateColor = (index: number, newHex: string) => {
    const newPalette = [...palette];
    if (newPalette[index]) {
        newPalette[index] = createColorObject(newHex, newPalette[index].isLocked);
        updatePaletteState(newPalette, harmony);
    }
  };

  const handleReorderPalette = (newPalette: Color[]) => {
       updatePaletteState(newPalette, harmony);
  };

  const handleToggleFavorite = () => {
      const currentHexes = palette.map(c => c.hex);
      const exists = favoritePalettes.some(p => JSON.stringify(p) === JSON.stringify(currentHexes));
      if (exists) {
          setFavoritePalettes(prev => prev.filter(p => JSON.stringify(p) !== JSON.stringify(currentHexes)));
      } else {
          setFavoritePalettes(prev => [currentHexes, ...prev]);
      }
  };
  
  const viewFallback = (
    <div className="flex flex-1 items-center justify-center bg-gray-50 py-20 text-sm font-medium text-gray-500">
      Loading workspace...
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      <Header 
        activeView={appView} 
        setAppView={setAppView} 
      />
      
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {appView === AppView.Palette && (
            <ColorPalette 
                palette={palette}
                previousPalette={previousPalette}
                transitionId={transitionId}
                onToggleLock={handleToggleLock}
                generateNewPalette={createNewPalette}
                harmony={harmony}
                baseColorForContrast={baseColorForContrast}
                onSetBaseColor={setBaseColorForContrast}
                isCurrentPaletteFavorite={favoritePalettes.some(p => JSON.stringify(p) === JSON.stringify(palette.map(c => c.hex)))}
                onToggleFavorite={handleToggleFavorite}
                onReorderPalette={handleReorderPalette}
                onUpdateColor={handleUpdateColor}
                canUndo={past.length > 0}
                canRedo={future.length > 0}
                onUndo={handleUndo}
                onRedo={handleRedo}
                isTransitioning={isTransitioning} 
                onTransitionComplete={handleTransitionComplete}
            />
        )}
        
        {appView === AppView.Image && (
            <Suspense fallback={viewFallback}>
              <MockupVisualizer palette={palette} />
            </Suspense>
        )}

        {appView === AppView.Trending && (
            <Suspense fallback={viewFallback}>
              <TrendingPage onLoadPalette={(colors) => {
                  animatePaletteUpdate(() => {
                      const newPalette = colors.map(hex => createColorObject(hex));
                      updatePaletteState(newPalette, 'trending');
                      setAppView(AppView.Palette);
                  });
              }} />
            </Suspense>
        )}

        {appView === AppView.Gradients && (
            <Suspense fallback={viewFallback}>
              <GradientPage 
                  onLoadPalette={(colors) => {
                      animatePaletteUpdate(() => {
                          const newPalette = colors.map(hex => createColorObject(hex));
                          updatePaletteState(newPalette, 'gradient');
                          setAppView(AppView.Palette);
                      });
                  }} 
                  currentPalette={palette.map(c => c.hex)}
              />
            </Suspense>
        )}

        {appView === AppView.ImageRecolor && (
            <Suspense fallback={viewFallback}>
              <ImageRecolorPage currentPalette={palette.map(c => c.hex)} />
            </Suspense>
        )}
      </main>
    </div>
  );
}
