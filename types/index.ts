export type Color = {
	r: number
	g: number
	b: number
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

export type RectangleLayer = {
	layerType: LayerType.RECTANGLE
	x: number
	y: number
	width: number
	height: number
	fill: Color
}

export type TextLayer = {
	layerType: LayerType.TEXT
	x: number
	y: number
	width: number
	height: number
	fill: Color
	value: string
}

export type EllipsisLayer = {
	layerType: LayerType.ELLIPSIS
	x: number
	y: number
	width: number
	height: number
	fill: Color
}

export type NoteLayer = {
	layerType: LayerType.NOTE
	x: number
	y: number
	width: number
	height: number
	fill: Color
	value: string
}

export type PathLayer = {
	layerType: LayerType.PATH
	x: number
	y: number
	width: number
	height: number
	fill: Color
	points: number[][]
}
