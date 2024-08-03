export type Color = {
	r: number
	g: number
	b: number
}

export type Camera = {
	x: number
	y: number
}

export type Point = {
	x: number
	y: number
}

export enum CanvasMode {
	NONE,
	INSERTING,
	RESIZING,
	TRANSLATING,
	PENCIL,
}

export enum LayerType {
	RECTANGLE,
	PATH,
	TEXT,
	NOTE,
	ELLIPSIS,
}

export enum Side {
	Top,
	Bottom,
	Left,
	Right,
}

export type XYWH = {
	x: number
	y: number
	width: number
	height: number
}

export type CanvasState =
	| {
			mode: CanvasMode.NONE
	  }
	| {
			mode: CanvasMode.INSERTING
			layerType:
				| LayerType.ELLIPSIS
				| LayerType.NOTE
				| LayerType.RECTANGLE
				| LayerType.TEXT
	  }
	| {
			mode: CanvasMode.PENCIL
	  }
	| { mode: CanvasMode.TRANSLATING; current: Point }
	| { mode: CanvasMode.RESIZING; initialBounds: XYWH; corner: Side[] }

export type RectangleLayer = {
	layerType: LayerType.RECTANGLE
	x: number
	y: number
	width: number
	height: number
	fill: Color
	value?: string
}

export type TextLayer = {
	layerType: LayerType.TEXT
	x: number
	y: number
	width: number
	height: number
	fill: Color
	value?: string
}

export type EllipsisLayer = {
	layerType: LayerType.ELLIPSIS
	x: number
	y: number
	width: number
	height: number
	fill: Color
	value?: string
}

export type NoteLayer = {
	layerType: LayerType.NOTE
	x: number
	y: number
	width: number
	height: number
	fill: Color
	value?: string
}

export type PathLayer = {
	layerType: LayerType.PATH
	x: number
	y: number
	width: number
	height: number
	fill: Color
	points: number[][]
	value?: string
}

export type Layer =
	| RectangleLayer
	| PathLayer
	| NoteLayer
	| EllipsisLayer
	| TextLayer
