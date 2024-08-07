import { Camera, Color, Point, XYWH, Side, PathLayer, LayerType } from '@/types'
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

export function getSelectionNetBounds(initial: Point, current: Point): XYWH {
	const x = initial.x < current.x ? initial.x : current.x
	const y = initial.y < current.y ? initial.y : current.y
	const width = Math.abs(current.x - initial.x)
	const height = Math.abs(current.y - initial.y)

	return { x, y, width, height }
}

export function getContrastTextColor(color: Color) {
	const l = 0.299 * color.r + 0.587 * color.g + 0.114 * color.b

	return l > 182 ? 'black' : 'white'
}

export function penPointsToPathLayer(
	points: number[][],
	color: Color
): PathLayer {
	if (points.length < 2)
		throw new Error('Cannot transfrom with less than 2 points')

	let left = Number.POSITIVE_INFINITY
	let top = Number.POSITIVE_INFINITY
	let right = Number.NEGATIVE_INFINITY
	let bottom = Number.NEGATIVE_INFINITY

	for (const point of points) {
		const [x, y] = point

		if (left > x) left = x
		if (top > y) top = y
		if (right < x) right = x
		if (bottom < y) bottom = y
	}

	return {
		layerType: LayerType.PATH,
		x: left,
		y: top,
		width: right - left,
		height: bottom - top,
		fill: color,
		points: points.map(([x, y, pressure]) => [x - left, y - top, pressure]),
	}
}

export function getSvgPathFromStroke(stroke: number[][]) {
	if (!stroke.length) return ''

	const d = stroke.reduce(
		(acc, [x0, y0], i, arr) => {
			const [x1, y1] = arr[(i + 1) % arr.length]
			acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2)
			return acc
		},
		['M', ...stroke[0], 'Q']
	)

	d.push('Z')
	return d.join(' ')
}
