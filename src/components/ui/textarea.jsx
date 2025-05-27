import React from 'react';

import { cn } from '@/lib/utils';

const TextArea = React.forwardRef(({ className, ...props }, ref) => {
	return (
		<textarea
			className={cn(
				'flex rounded-sm grow resize-none border border-input bg-transparent px-2 py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
				className
			)}
			ref={ref}
			{...props}
		/>
	);
});
TextArea.displayName = 'TextArea';

export { TextArea };
