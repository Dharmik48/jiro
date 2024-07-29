import { Skeleton } from '@/components/ui/skeleton'
import ToolButton from './ToolButton'
import {
	Circle,
	MousePointer2,
	Pencil,
	Redo,
	Square,
	StickyNote,
	Type,
	Undo,
} from 'lucide-react'
import { CanvasMode, CanvasState, LayerType } from '@/types/canvas'

interface Props {
	canvasState: CanvasState
	setCanvasState: (state: CanvasState) => void
	undo: () => void
	redo: () => void
	canUndo: boolean
	canRedo: boolean
}

const Toolbar = ({
	canvasState,
	setCanvasState,
	undo,
	redo,
	canRedo,
	canUndo,
}: Props) => {
	return (
		<div className='absolute top-1/2 left-4 -translate-y-1/2 space-y-4'>
			<div className='rounded-lg border p-2 bg-secondary gap-2 text-secondary-foreground border-border shadow-sm max-w-sm flex flex-col'>
				<ToolButton
					icon={MousePointer2}
					label='Select'
					onClick={() => {
						setCanvasState({ mode: CanvasMode.None })
					}}
					isActive={[
						CanvasMode.None,
						CanvasMode.Translating,
						CanvasMode.Resizing,
						CanvasMode.Translating,
						CanvasMode.Pressing,
					].includes(canvasState.mode)}
				/>
				<ToolButton
					icon={Type}
					label='Type'
					onClick={() => {
						setCanvasState({
							mode: CanvasMode.Inserting,
							layerType: LayerType.Text,
						})
					}}
					isActive={
						canvasState.mode === CanvasMode.Inserting &&
						canvasState.layerType === LayerType.Text
					}
				/>
				<ToolButton
					icon={StickyNote}
					label='Sticky Note'
					onClick={() => {
						setCanvasState({
							mode: CanvasMode.Inserting,
							layerType: LayerType.Note,
						})
					}}
					isActive={
						canvasState.mode === CanvasMode.Inserting &&
						canvasState.layerType === LayerType.Note
					}
				/>
				<ToolButton
					icon={Square}
					label='Rectangle'
					onClick={() => {
						setCanvasState({
							mode: CanvasMode.Inserting,
							layerType: LayerType.Rectangle,
						})
					}}
					isActive={
						canvasState.mode === CanvasMode.Inserting &&
						canvasState.layerType === LayerType.Rectangle
					}
				/>
				<ToolButton
					icon={Circle}
					label='Circle'
					onClick={() => {
						setCanvasState({
							mode: CanvasMode.Inserting,
							layerType: LayerType.Ellipse,
						})
					}}
					isActive={
						canvasState.mode === CanvasMode.Inserting &&
						canvasState.layerType === LayerType.Ellipse
					}
				/>
				<ToolButton
					icon={Pencil}
					label='Pencil'
					onClick={() => {
						setCanvasState({ mode: CanvasMode.Pencil })
					}}
					isActive={canvasState.mode === CanvasMode.Pencil}
				/>
			</div>
			<div className='rounded-lg border p-2 bg-secondary text-secondary-foreground border-border shadow-sm max-w-sm flex flex-col gap-2'>
				<ToolButton
					icon={Undo}
					label='Undo'
					onClick={undo}
					isDisabled={!canUndo}
				/>
				<ToolButton
					icon={Redo}
					label='Redo'
					onClick={redo}
					isDisabled={!canRedo}
				/>
			</div>
		</div>
	)
}

Toolbar.Skeleton = function ToolbarSkeleton() {
	return (
		<div className='absolute top-1/2 left-4 -translate-y-1/2 space-y-4'>
			<div className='rounded-lg border p-4 bg-secondary text-secondary-foreground border-border shadow-sm w-28 h-28'>
				<Skeleton />
			</div>
			<div className='rounded-lg border p-4 bg-secondary text-secondary-foreground border-border shadow-sm w-28 h-16'>
				<Skeleton />
			</div>
		</div>
	)
}

export default Toolbar
