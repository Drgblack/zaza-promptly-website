export function useAnalytics() {
  return {
    track: () => {},
    page: () => {},
    identify: () => {}
  };
}