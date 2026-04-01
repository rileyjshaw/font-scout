import React from 'react';
import ReactSelect from 'react-select';

import { cn } from '@/lib/utils';

const Select = React.forwardRef(({ ...props }, ref) => {
	return (
		<ReactSelect
			autoFocus={false}
			theme={theme => ({
				...theme,
				colors: {
					primary: 'var(--color-blue-500)',
					primary75: 'var(--color-blue-700)',
					primary50: 'var(--color-blue-500)',
					primary25: 'var(--color-blue-100)',
					danger: 'var(--color-red-500)',
					dangerLight: 'var(--color-red-200)',
					neutral0: 'var(--color-white)',
					neutral5: 'var(--color-gray-50)',
					neutral10: 'var(--color-gray-100)',
					neutral20: 'var(--color-gray-200)',
					neutral30: 'var(--color-gray-300)',
					neutral40: 'var(--color-gray-400)',
					neutral50: 'var(--color-gray-500)',
					neutral60: 'var(--color-gray-600)',
					neutral70: 'var(--color-gray-700)',
					neutral80: 'var(--color-gray-800)',
					neutral90: 'var(--color-gray-900)',
				},
			})}
			classNames={{
				control: state =>
					cn(
						'!rounded-sm !border-input !shadow-none text-base transition-colors placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
						state.isFocused && 'outline-none ring-1 ring-ring',
					),
				groupHeading: _state => cn('!text-[0.5rem] !font-bold !text-foreground !uppercase tracking-[1px]'),
				option: _state => cn('!text-sm !text-foreground !py-1'),
			}}
			ref={ref}
			{...props}
		/>
	);
});
Select.displayName = 'Select';

export { Select };
