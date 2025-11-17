export const CAMERA_DISTANCE_FROM_FLOOR = 1.25
export const CAMERA_DISTANCE_FROM_OBJECT = 3
export const CAMERA_FOCAL_LENGTH = 10 // mm

// Converts focal length (mm) to FOV (degrees) assuming full-frame sensor (36mm x 24mm)
export const focalLengthToFov = (focalLength: number) => {
  const sensorHeight = 24 // mm (full-frame sensor height)
  return 2 * Math.atan(sensorHeight / (2 * focalLength)) * (180 / Math.PI)
}
