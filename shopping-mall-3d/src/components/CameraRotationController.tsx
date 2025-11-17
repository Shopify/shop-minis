import {useThree} from '@react-three/fiber'
import {useEffect, useRef} from 'react'
import * as THREE from 'three'

export const CameraRotationController = () => {
  const {camera, gl} = useThree()
  const isDragging = useRef(false)
  const previousTouch = useRef({x: 0, y: 0})
  const quaternion = useRef(new THREE.Quaternion())
  const euler = useRef(new THREE.Euler(0, 0, 0, 'YXZ'))

  useEffect(() => {
    const domElement = gl.domElement

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging.current = true
        previousTouch.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        }
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current || e.touches.length !== 1) return

      const touch = e.touches[0]
      const dx = touch.clientX - previousTouch.current.x
      const dy = touch.clientY - previousTouch.current.y

      const rotationSpeed = 0.005

      euler.current.setFromQuaternion(camera.quaternion)
      euler.current.y += dx * rotationSpeed
      euler.current.x += dy * rotationSpeed

      // Clamp vertical rotation to prevent over-rotation
      euler.current.x = Math.max(
        -Math.PI / 2,
        Math.min(Math.PI / 2, euler.current.x)
      )

      quaternion.current.setFromEuler(euler.current)
      camera.quaternion.copy(quaternion.current)

      previousTouch.current = {
        x: touch.clientX,
        y: touch.clientY,
      }
    }

    const handleTouchEnd = () => {
      isDragging.current = false
    }

    // Mouse events for desktop testing
    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true
      previousTouch.current = {
        x: e.clientX,
        y: e.clientY,
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return

      const dx = e.clientX - previousTouch.current.x
      const dy = e.clientY - previousTouch.current.y

      const rotationSpeed = 0.005

      euler.current.setFromQuaternion(camera.quaternion)
      euler.current.y += dx * rotationSpeed
      euler.current.x += dy * rotationSpeed

      // Clamp vertical rotation to prevent over-rotation
      euler.current.x = Math.max(
        -Math.PI / 2,
        Math.min(Math.PI / 2, euler.current.x)
      )

      quaternion.current.setFromEuler(euler.current)
      camera.quaternion.copy(quaternion.current)

      previousTouch.current = {
        x: e.clientX,
        y: e.clientY,
      }
    }

    const handleMouseUp = () => {
      isDragging.current = false
    }

    // Add touch event listeners
    domElement.addEventListener('touchstart', handleTouchStart, {passive: true})
    domElement.addEventListener('touchmove', handleTouchMove, {passive: true})
    domElement.addEventListener('touchend', handleTouchEnd, {passive: true})

    // Add mouse event listeners for desktop testing
    domElement.addEventListener('mousedown', handleMouseDown)
    domElement.addEventListener('mousemove', handleMouseMove)
    domElement.addEventListener('mouseup', handleMouseUp)

    return () => {
      domElement.removeEventListener('touchstart', handleTouchStart)
      domElement.removeEventListener('touchmove', handleTouchMove)
      domElement.removeEventListener('touchend', handleTouchEnd)
      domElement.removeEventListener('mousedown', handleMouseDown)
      domElement.removeEventListener('mousemove', handleMouseMove)
      domElement.removeEventListener('mouseup', handleMouseUp)
    }
  }, [camera, gl])

  return null
}
