import { Button } from '@/components/ui/button'
import { colorTypeToRGB } from '@/lib/utils'
import { Color } from '@/types'

interface ColorPickerProps {
	onChange: (color: Color) => void
}

const ColorPicker = ({ onChange }: ColorPickerProps) => {
	return (
		<div className='flex flex-wrap gap-2 items-center max-w-44 justify-center border-r border-secondary-foreground pr-3 mr-3'>
			<ColorButton onChange={onChange} color={{ r: 243, g: 82, b: 35 }} />
			<ColorButton onChange={onChange} color={{ r: 255, g: 249, b: 177 }} />
			<ColorButton onChange={onChange} color={{ r: 68, g: 202, b: 99 }} />
			<ColorButton onChange={onChange} color={{ r: 39, g: 142, b: 237 }} />
			<ColorButton onChange={onChange} color={{ r: 155, g: 105, b: 245 }} />
			<ColorButton onChange={onChange} color={{ r: 252, g: 142, b: 42 }} />
			<ColorButton onChange={onChange} color={{ r: 0, g: 0, b: 0 }} />
			<ColorButton onChange={onChange} color={{ r: 255, g: 255, b: 255 }} />
		</div>
	)
}

interface ColorButtonProps {
	color: Color
	onChange: (color: Color) => void
}

const ColorButton = ({ color, onChange }: ColorButtonProps) => {
	return (
		<Button
			style={{ backgroundColor: colorTypeToRGB(color) }}
			className='aspect-square h-8 p-0 rounded-md hover:opacity-75 transition-opacity'
			onClick={() => onChange(color)}
		/>
	)
}

export default ColorPicker
