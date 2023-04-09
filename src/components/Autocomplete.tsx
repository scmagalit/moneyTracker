'use client';
import { useState, KeyboardEvent } from 'react';

type props = {
    list: string[];
};

export function AutoComplete({ list }: props) {
    const [query, setQuery] = useState('');
    const [filtered, setFiltered] = useState<string[]>([]);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);

    const handleInputChange = (query: string) => {
        setQuery(query);

        if (query.length > 0) {
            const suggestions = list
                .filter((item) => item.toLowerCase().includes(query.toLowerCase()))
                .slice(0, 5);
            setFiltered(suggestions);
        } else {
            setFiltered([]);
        }
    };

    const handleInputBlur = () => {
        setHighlightedIndex(-1);
        setFiltered([]);
    };

    const handleSuggestionClick = (suggestion: string) => {
        setQuery(suggestion);
        handleInputBlur();
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            setHighlightedIndex((prev) => (prev === filtered.length - 1 ? 0 : prev + 1));
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            setHighlightedIndex((prev) => (prev === 0 ? filtered.length - 1 : prev - 1));
        } else if (event.key === 'Enter' && highlightedIndex !== -1) {
            event.preventDefault();
            handleSuggestionClick(filtered[highlightedIndex]);
        } else if (event.key === 'Escape') {
            handleInputBlur();
        }
    };

    return (
        <div className="relative">
            <input
                type="text"
                value={query}
                onKeyDown={handleKeyDown}
                onFocus={(e) => handleInputChange(e.target.value)}
                onBlur={handleInputBlur}
                onChange={(e) => handleInputChange(e.target.value)}
                className="border border-gray-300 rounded-md py-2 px-3 w-full"
            />
            {filtered.length > 0 && (
                <div className="absolute z-10 bg-white border border-gray-300 rounded-md mt-1 w-full max-h-52 overflow-auto">
                    {filtered.map((suggestion, index) => (
                        <div
                            key={suggestion}
                            className={`px-3 py-2 cursor-pointer  ${
                                index === highlightedIndex ? 'bg-gray-100' : ''
                            }`}
                            onMouseDown={() => handleSuggestionClick(suggestion)}
                            onMouseOver={() => setHighlightedIndex(index)}>
                            {suggestion}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
