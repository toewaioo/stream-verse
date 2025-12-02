import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={
                'rounded-xl border text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 placeholder-gray-500 transition-all duration-200 ' +
                'bg-white dark:bg-gray-900/50 border-gray-300 dark:border-gray-700 ' +
                className
            }
            ref={localRef}
        />
    );
});
