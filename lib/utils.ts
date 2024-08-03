import { Camera, Color, Point, XYWH, Side } from '@/types'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

const COLORS = ['#dc2626', '#d97706', '#059669', '#7c3aed', '#db2777']

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function connectionIdToColor(connectionId: number): string {
	return COLORS[connectionId % COLORS.length]
}

export function pointerEventToCanvasPoint(
	e: React.PointerEvent,
	camera: Camera
) {
	return {
		x: Math.round(e.clientX) - camera.x,
		y: Math.round(e.clientY) - camera.y,
	}
}

export function colorTypeToRGB({ r, g, b }: Color) {
	return `rgb(${r} ${g} ${b})`
}

export function getResizedBounds(
	initialBounds: XYWH,
	corner: Side[],
	point: Point
): XYWH {
	const bounds = {
		x: initialBounds.x,
		y: initialBounds.y,
		width: initialBounds.width,
		height: initialBounds.height,
	}

	if (corner.includes(Side.Right)) {
		bounds.x = Math.min(initialBounds.x, point.x)
		bounds.width = Math.abs(point.x - initialBounds.x)
	}

	if (corner.includes(Side.Left)) {
		bounds.x = Math.min(initialBounds.x + initialBounds.width, point.x)
		bounds.width = Math.abs(initialBounds.x + initialBounds.width - point.x)
	}

	if (corner.includes(Side.Bottom)) {
		bounds.y = Math.min(initialBounds.y, point.y)
		bounds.height = Math.abs(point.y - initialBounds.y)
	}

	if (corner.includes(Side.Top)) {
		bounds.y = Math.min(initialBounds.y + initialBounds.height, point.y)
		bounds.height = Math.abs(initialBounds.y + initialBounds.height - point.y)
	}

	return bounds
}
