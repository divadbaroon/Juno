import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';
import { FilterType, FilterOption, profileFilterOptions, llmFilterOptions, promptFilterOptions, voiceFilterOptions, extensionFilterOptions } from '@/constants';

interface FilterProps {
    contextType: string;
    cardType: string;
    onTagsChange?: (tags: string[]) => void;
    initialTags?: string[];
}

const Filter: React.FC<FilterProps> = ({ contextType, cardType, onTagsChange, initialTags = [] }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [filterName, setFilterName] = useState("");
    const [activeFilters, setActiveFilters] = useState<{[key: string]: string}>({});
    const [activeFilterType, setActiveFilterType] = useState<FilterType[]>([]);
    const [tags, setTagsState] = useState<string[]>(initialTags);

    useEffect(() => {
        if (contextType === 'Lab') {
            setFilterName("Add tag")
        }
        else if (contextType === 'Library') {
            setFilterName("Add filter")
        }

        if (cardType === 'Profiles') {
            setActiveFilterType(profileFilterOptions);
        } else if (cardType === 'LLMs') {
            setActiveFilterType(llmFilterOptions);
        } else if (cardType === 'Prompts') {
            setActiveFilterType(promptFilterOptions);
        } else if (cardType === 'Voices') {
            setActiveFilterType(voiceFilterOptions);
        } else if (cardType === 'Extensions') {
            setActiveFilterType(extensionFilterOptions);
        }
    }, [cardType, contextType]);

    useEffect(() => {
        if (contextType === 'Library') {
            updateURL();
        }
    }, [activeFilters, contextType, router, searchParams]);

    const updateURL = () => {
        const currentParams = new URLSearchParams(searchParams.toString());
        
        // Remove all existing filter params
        activeFilterType.forEach(filter => {
            currentParams.delete(filter.value);
        });

        // Add active filters
        Object.entries(activeFilters).forEach(([key, value]) => {
            if (value) {
                currentParams.set(key, value);
            }
        });

        const newUrl = `${window.location.pathname}?${currentParams.toString()}`;
        router.push(newUrl, { scroll: false });
    };

    const addFilter = (filterType: string) => {
        setActiveFilters(prev => ({ ...prev, [filterType]: '' }));
    };

    const removeFilter = (filterType: string) => {
        setActiveFilters(prev => {
            const newFilters = { ...prev };
            delete newFilters[filterType];
            return newFilters;
        });
        updateTags();
    };

    const updateFilter = (filterType: string, value: string) => {
        setActiveFilters(prev => ({ ...prev, [filterType]: value }));
        updateTags();
    };

    const updateTags = () => {
        const newTags = Object.entries(activeFilters).map(([filterType, filterValue]) => `${filterType}: ${filterValue}`);
        setTagsState(newTags);
        if (onTagsChange) {
            onTagsChange(newTags);
        }
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger className="focus-visible:ring-offset-0 focus-visible:ring-0" asChild>
                    <Button variant="outline" size="sm" className="-mt-4 ml-1">{filterName}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {activeFilterType.map((option: FilterType) => (
                        <DropdownMenuItem 
                            key={option.value}
                            onClick={() => addFilter(option.value)}
                            disabled={activeFilters.hasOwnProperty(option.value)}
                        >
                            {option.label}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex-1 flex items-center space-x-1 -mt-3">
                {Object.entries(activeFilters).map(([filterType, filterValue]) => {
                    const filterOption = activeFilterType.find(option => option.value === filterType);
                    return (
                        <div key={filterType} className="flex items-center space-x-.5 -ml-2.5">
                            <Select
                                value={filterValue}
                                onValueChange={(value) => {
                                    updateFilter(filterType, value);
                                }}
                            >
                                <SelectTrigger className="w-[150px] ring-0 focus:ring-0">
                                    <SelectValue placeholder={`Select ${filterOption?.label}`} />
                                </SelectTrigger>
                                <SelectContent>
                                    {filterOption?.options.map((option: FilterOption) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Button onClick={() => removeFilter(filterType)} variant="ghost" size="icon">
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default Filter;