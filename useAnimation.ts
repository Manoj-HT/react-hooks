import { CSSProperties, useEffect, useRef } from "react";

export const useAnimation = <HTMLElementType>(
  cssEffects: KeyFrameType[],
  timingOptions: KeyframeAnimationOptions
) => {
  const ref = useRef<HTMLElementType>(null);
  useEffect(() => {
    if (ref.current) {
      (ref.current as unknown as HTMLElement).animate(
        cssEffects,
        timingOptions
      )
    }
  }, [ref]);
  return ref;
};

type KeyFrameType = CSSProperties & Keyframe;
export type AnimationOptionTypes = {
    cssEffects : KeyFrameType[],
    timingOptions : KeyframeAnimationOptions
}
