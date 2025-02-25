// flubber.d.ts
declare module "flubber" {
  interface InterpolateOptions {
    maxSegmentLength?: number;
  }
  export function interpolate(
    source: string,
    target: string,
    options?: InterpolateOptions
  ): (t: number) => string;
}
